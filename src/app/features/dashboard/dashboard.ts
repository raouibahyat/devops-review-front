// ============================================================
// DASHBOARD COMPONENT — standalone, Angular 17+
// ============================================================
import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, switchMap, of } from 'rxjs';
import { GitlabService, DashboardData } from '../../core/services/gitlab';
import {
  GitlabProject, GitlabPipeline, GitlabMergeRequest, GitlabPackage,
  GitlabMember, GitlabDeployment, GitlabIssue, GitlabCommit,
  DashboardFilter, ProjectStats, ACCESS_LEVEL_LABELS,
} from '../../core/models/gitlab.models';
import { MOCK_PROJECTS } from '../../core/data/mock-data';

// Chart.js — doit être chargé globalement (via angular.json scripts)
declare const Chart: any;

type ActiveTab = 'overview' | 'pipelines' | 'mergerequests' | 'commits' | 'packages' | 'issues' | 'environments' | 'members';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DecimalPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('pipelineChartRef') pipelineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('coverageChartRef') coverageChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mrChartRef')       mrChartRef!:       ElementRef<HTMLCanvasElement>;

  // ── State ──────────────────────────────────────────────────
  loading       = false;
  searched      = false;
  activeTab: ActiveTab = 'overview';

  dashData: DashboardData | null = null;

  // ── Accesseurs rapides ─────────────────────────────────────
  get project():       GitlabProject        { return this.dashData!.project;       }
  get pipelines():     GitlabPipeline[]     { return this.dashData!.pipelines;     }
  get mergeRequests(): GitlabMergeRequest[] { return this.dashData!.mergeRequests; }
  get commits():       GitlabCommit[]       { return this.dashData!.commits;       }
  get packages():      GitlabPackage[]      { return this.dashData!.packages;      }
  get members():       GitlabMember[]       { return this.dashData!.members;       }
  get deployments():   GitlabDeployment[]   { return this.dashData!.deployments;   }
  get issues():        GitlabIssue[]        { return this.dashData!.issues;        }
  get stats():         ProjectStats         { return this.dashData!.stats;         }

  // ── Suggestions autocomplete ───────────────────────────────
  projectSuggestions: GitlabProject[] = [];
  showDropdown = false;

  // ── Formulaire ────────────────────────────────────────────
  filterForm!: FormGroup;

  // ── Filtres inline ─────────────────────────────────────────
  pipelineStatusFilter = 'all';
  mrStateFilter        = 'all';
  packageTypeFilter    = 'all';
  issueStateFilter     = 'all';
  commitSearch         = '';
  memberSearch         = '';

  // ── Constantes UI ─────────────────────────────────────────
  readonly ACCESS_LABELS      = ACCESS_LEVEL_LABELS;
  readonly PIPELINE_STATUSES  = ['all','success','failed','running','canceled','pending'];
  readonly MR_STATES          = ['all','opened','merged','closed'];
  readonly PACKAGE_TYPES      = ['all','npm','docker','maven','pypi','nuget'];
  readonly ISSUE_STATES       = ['all','opened','closed'];
  readonly TABS: { key: ActiveTab; label: string }[] = [
    { key: 'overview',      label: 'Overview'       },
    { key: 'pipelines',     label: 'Pipelines'      },
    { key: 'mergerequests', label: 'Merge Requests' },
    { key: 'commits',       label: 'Commits'        },
    { key: 'packages',      label: 'Packages'       },
    { key: 'issues',        label: 'Issues'         },
    { key: 'environments',  label: 'Environments'   },
    { key: 'members',       label: 'Members'        },
  ];

  // ── Charts ─────────────────────────────────────────────────
  private pipelineChart: any = null;
  private coverageChart: any = null;
  private mrChart:       any = null;

  private destroy$    = new Subject<void>();
  private searchQuery$ = new Subject<string>();

  // Stockage interne de l'ID projet sélectionné
  private _selectedProjectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private gitlabService: GitlabService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupSearch();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyCharts();
  }

  // ==========================================================
  // FORMULAIRE
  // ==========================================================

  private buildForm(): void {
    const today    = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    this.filterForm = this.fb.group({
      projectQuery:   [''],
      dateFrom:       [monthAgo.toISOString().slice(0, 10)],
      dateTo:         [today.toISOString().slice(0, 10)],
      pipelineStatus: ['all'],
      mrState:        ['all'],
    });
  }

  // ==========================================================
  // AUTOCOMPLETE PROJET
  // ==========================================================

  private setupSearch(): void {
    this.searchQuery$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(q => q.trim().length > 0 ? this.gitlabService.searchProjects(q) : of([])),
      takeUntil(this.destroy$),
    ).subscribe(results => {
      this.projectSuggestions = results;
      this.showDropdown = results.length > 0;
      this.cdr.detectChanges();
    });
  }

  onProjectInput(event: Event): void {
    const q = (event.target as HTMLInputElement).value;
    this.filterForm.patchValue({ projectQuery: q }, { emitEvent: false });
    this._selectedProjectId = null;
    this.searchQuery$.next(q);
  }

  selectProject(project: GitlabProject): void {
    this.filterForm.patchValue({ projectQuery: project.name });
    this._selectedProjectId = project.id;
    this.showDropdown = false;
    this.projectSuggestions = [];
  }

  closeDropdown(): void {
    setTimeout(() => { this.showDropdown = false; }, 200);
  }

  // ==========================================================
  // RECHERCHE PRINCIPALE
  // ==========================================================

  search(): void {
    const { projectQuery, dateFrom, dateTo, pipelineStatus, mrState } = this.filterForm.value;

    let projectId: number | null = this._selectedProjectId;
    if (!projectId && projectQuery) {
      const byId   = MOCK_PROJECTS.find(p => String(p.id) === projectQuery.trim());
      const byName = MOCK_PROJECTS.find(p =>
        p.name.toLowerCase() === projectQuery.trim().toLowerCase()
      );
      projectId = (byId ?? byName)?.id ?? MOCK_PROJECTS[0].id;
    }
    if (!projectId) { projectId = MOCK_PROJECTS[0].id; }

    const filter: DashboardFilter = {
      projectId, projectQuery, dateFrom, dateTo, pipelineStatus, mrState,
    };

    this.loading  = true;
    this.searched = false;
    this.destroyCharts();

    this.gitlabService.loadDashboard(filter).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (data) => {
        this.dashData  = data;
        this.loading   = false;
        this.searched  = true;
        this.activeTab = 'overview';
        this.cdr.detectChanges();
        setTimeout(() => this.initCharts(), 100);
      },
      error: () => { this.loading = false; },
    });
  }

  // ==========================================================
  // TABS
  // ==========================================================

  setTab(tab: ActiveTab): void {
    this.activeTab = tab;
    if (tab === 'overview') {
      setTimeout(() => this.initCharts(), 100);
    }
  }

  // ==========================================================
  // FILTRES INLINE
  // ==========================================================

  get filteredPipelines(): GitlabPipeline[] {
    if (!this.dashData) return [];
    let data = this.dashData.pipelines;
    if (this.pipelineStatusFilter !== 'all') {
      data = data.filter(p => p.status === this.pipelineStatusFilter);
    }
    return data;
  }

  get filteredMRs(): GitlabMergeRequest[] {
    if (!this.dashData) return [];
    let data = this.dashData.mergeRequests;
    if (this.mrStateFilter !== 'all') {
      data = data.filter(m => m.state === this.mrStateFilter);
    }
    return data;
  }

  get filteredPackages(): GitlabPackage[] {
    if (!this.dashData) return [];
    let data = this.dashData.packages;
    if (this.packageTypeFilter !== 'all') {
      data = data.filter(p => p.package_type === this.packageTypeFilter);
    }
    return data;
  }

  get filteredIssues(): GitlabIssue[] {
    if (!this.dashData) return [];
    let data = this.dashData.issues;
    if (this.issueStateFilter !== 'all') {
      data = data.filter(i => i.state === this.issueStateFilter);
    }
    return data;
  }

  get filteredCommits(): GitlabCommit[] {
    if (!this.dashData) return [];
    let data = this.dashData.commits;
    const q  = this.commitSearch.toLowerCase();
    if (q) {
      data = data.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.author_name.toLowerCase().includes(q)
      );
    }
    return data;
  }

  get filteredMembers(): GitlabMember[] {
    if (!this.dashData) return [];
    let data = this.dashData.members;
    const q  = this.memberSearch.toLowerCase();
    if (q) {
      data = data.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q)
      );
    }
    return data;
  }

  // ==========================================================
  // DONNÉES CHART PIPELINE (timeline par jour)
  // ==========================================================

  get pipelineDayData(): { labels: string[]; success: number[]; failed: number[]; canceled: number[] } {
    const map: Record<string, { s: number; f: number; c: number }> = {};
    (this.dashData?.pipelines ?? []).forEach(p => {
      const d = p.created_at.slice(0, 10);
      if (!map[d]) { map[d] = { s: 0, f: 0, c: 0 }; }
      if (p.status === 'success')  { map[d].s++; }
      if (p.status === 'failed')   { map[d].f++; }
      if (p.status === 'canceled') { map[d].c++; }
    });
    const labels = Object.keys(map).sort();
    return {
      labels,
      success:  labels.map(l => map[l].s),
      failed:   labels.map(l => map[l].f),
      canceled: labels.map(l => map[l].c),
    };
  }

  // ==========================================================
  // CHARTS
  // ==========================================================

  private initCharts(): void {
    if (!this.dashData || typeof Chart === 'undefined') { return; }
    this.initPipelineChart();
    this.initCoverageChart();
    this.initMrChart();
  }

  private initPipelineChart(): void {
    const el = this.pipelineChartRef?.nativeElement;
    if (!el) { return; }
    if (this.pipelineChart) { this.pipelineChart.destroy(); }
    const { labels, success, failed, canceled } = this.pipelineDayData;
    this.pipelineChart = new Chart(el, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Success',  data: success,  backgroundColor: '#34d399', borderRadius: 4 },
          { label: 'Failed',   data: failed,   backgroundColor: '#f87171', borderRadius: 4 },
          { label: 'Canceled', data: canceled, backgroundColor: '#475569', borderRadius: 4 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            stacked: false,
            ticks: { color: '#475569', font: { size: 9 }, maxRotation: 45, autoSkip: true },
            grid: { color: 'rgba(139,92,246,.06)' },
            border: { color: 'rgba(139,92,246,.1)' },
          },
          y: {
            beginAtZero: true,
            ticks: { color: '#475569', font: { size: 9 }, stepSize: 1 },
            grid: { color: 'rgba(139,92,246,.06)' },
            border: { color: 'rgba(139,92,246,.1)' },
          },
        },
      },
    });
  }

  private initCoverageChart(): void {
    const el = this.coverageChartRef?.nativeElement;
    if (!el) { return; }
    if (this.coverageChart) { this.coverageChart.destroy(); }
    const pipelinesWithCov = this.dashData!.pipelines.filter(p => p.coverage != null).slice(-8);
    const labels = pipelinesWithCov.map(p => '#' + p.id);
    const values = pipelinesWithCov.map(p => parseFloat(p.coverage!));
    this.coverageChart = new Chart(el, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Coverage %', data: values,
          borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,.1)',
          borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#a78bfa',
          tension: 0.35, fill: true,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { display: false } },
          y: {
            min: 80, max: 100,
            ticks: { color: '#475569', font: { size: 9 }, callback: (v: number) => v + '%' },
            grid: { color: 'rgba(139,92,246,.06)' },
          },
        },
      },
    });
  }

  private initMrChart(): void {
    const el = this.mrChartRef?.nativeElement;
    if (!el) { return; }
    if (this.mrChart) { this.mrChart.destroy(); }
    const s = this.stats;
    this.mrChart = new Chart(el, {
      type: 'doughnut',
      data: {
        labels: ['Merged', 'Open', 'Closed'],
        datasets: [{
          data: [s.mergedMRs, s.openMRs, s.closedMRs],
          backgroundColor: ['#34d399', '#a78bfa', '#475569'],
          borderWidth: 0, borderRadius: 4, spacing: 3,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { display: false } },
      },
    });
  }

  private destroyCharts(): void {
    this.pipelineChart?.destroy();
    this.coverageChart?.destroy();
    this.mrChart?.destroy();
    this.pipelineChart = null;
    this.coverageChart = null;
    this.mrChart       = null;
  }

  // ==========================================================
  // UTILS / FORMATTERS
  // ==========================================================

  formatDuration(s: number | null): string {
    if (s == null) { return '—'; }
    if (s < 60) { return `${s}s`; }
    const m   = Math.floor(s / 60);
    const sec = s % 60;
    return sec ? `${m}m ${sec}s` : `${m}m`;
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) { return '—'; }
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  formatDateTime(dateStr: string | null): string {
    if (!dateStr) { return '—'; }
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  }

  formatBytes(bytes: number): string {
    if (bytes < 1024)          { return bytes + ' B'; }
    if (bytes < 1024 * 1024)   { return (bytes / 1024).toFixed(1) + ' KB'; }
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  accessLabel(level: number): string {
    return ACCESS_LEVEL_LABELS[level] ?? 'Unknown';
  }

  accessClass(level: number): string {
    const map: Record<number, string> = {
      50: 'owner', 40: 'maintainer', 30: 'developer', 20: 'reporter', 10: 'guest',
    };
    return map[level] ?? '';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      success:   'success',
      failed:    'failed',
      running:   'running',
      canceled:  'canceled',
      pending:   'pending',
      merged:    'merged',
      opened:    'opened',
      closed:    'closed',
      available: 'success',
      stopped:   'canceled',
      online:    'online',
      offline:   'offline',
      paused:    'paused',
    };
    return map[status] ?? '';
  }

  deploySuccessRate(): number {
    const total = this.deployments.length;
    if (!total) { return 0; }
    return Math.round(this.deployments.filter(d => d.status === 'success').length / total * 100);
  }

  commitTypeClass(title: string): string {
    if (title.startsWith('feat'))     { return 'feat';     }
    if (title.startsWith('fix'))      { return 'fix';      }
    if (title.startsWith('refactor')) { return 'refactor'; }
    if (title.startsWith('test'))     { return 'test';     }
    if (title.startsWith('chore'))    { return 'chore';    }
    if (title.startsWith('docs'))     { return 'docs';     }
    return 'other';
  }
}
