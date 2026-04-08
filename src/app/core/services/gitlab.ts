
import { Injectable } from '@angular/core';
import { Observable, of, delay, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GitlabProject, GitlabPipeline, GitlabMergeRequest, GitlabCommit,
  GitlabBranch, GitlabTag, GitlabIssue, GitlabMember, GitlabPackage,
  GitlabEnvironment, GitlabDeployment, GitlabContributor, GitlabRunner,
  ProjectStats, DashboardFilter,
} from '../models/gitlab.models';
import {
  MOCK_PROJECTS, MOCK_PIPELINES, MOCK_MERGE_REQUESTS, MOCK_COMMITS,
  MOCK_BRANCHES, MOCK_TAGS, MOCK_ISSUES, MOCK_MEMBERS, MOCK_PACKAGES,
  MOCK_ENVIRONMENTS, MOCK_DEPLOYMENTS, MOCK_CONTRIBUTORS, MOCK_RUNNERS,
} from '../data/mock-data';

// ── Types exportés ───────────────────────────────────────────
export interface DashboardData {
  project:       GitlabProject;
  pipelines:     GitlabPipeline[];
  mergeRequests: GitlabMergeRequest[];
  commits:       GitlabCommit[];
  branches:      GitlabBranch[];
  tags:          GitlabTag[];
  issues:        GitlabIssue[];
  members:       GitlabMember[];
  packages:      GitlabPackage[];
  environments:  GitlabEnvironment[];
  deployments:   GitlabDeployment[];
  contributors:  GitlabContributor[];
  runners:       GitlabRunner[];
  stats:         ProjectStats;
}

@Injectable({ providedIn: 'root' })
export class GitlabService {

  // ── Config (real API) ──────────────────────────────────────
  private baseUrl = 'https://gitlab.com/api/v4';
  private token   = '';  // à remplir depuis l'environnement

  setToken(token: string): void  { this.token   = token; }
  setBaseUrl(url: string): void  { this.baseUrl = url;   }

  // ── Simulation délai réseau ────────────────────────────────
  private sim<T>(data: T, ms = 400): Observable<T> {
    return of(data).pipe(delay(ms));
  }

  // ── Filtre par plage de dates ──────────────────────────────
  private inRange(dateStr: string, from?: string, to?: string): boolean {
    const d = dateStr.slice(0, 10);
    return (!from || d >= from) && (!to || d <= to);
  }



  searchProjects(query: string): Observable<GitlabProject[]> {
    const q = query.trim().toLowerCase();
    if (!q) { return this.sim([]); }
    const results = MOCK_PROJECTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.name_with_namespace.toLowerCase().includes(q) ||
      String(p.id).includes(q)
    );
    return this.sim(results, 200);
  }

  getMyProjects(): Observable<GitlabProject[]> {
    return this.sim(MOCK_PROJECTS);
  }

  getProject(id: number): Observable<GitlabProject> {
    return this.sim(MOCK_PROJECTS.find(p => p.id === id) ?? MOCK_PROJECTS[0]);
  }



  getPipelines(projectId: number, from?: string, to?: string, status?: string): Observable<GitlabPipeline[]> {
    let data = [...MOCK_PIPELINES];
    if (from || to) { data = data.filter(p => this.inRange(p.created_at, from, to)); }
    if (status && status !== 'all') { data = data.filter(p => p.status === status); }
    return this.sim(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
  }


  getMergeRequests(projectId: number, from?: string, to?: string, state?: string): Observable<GitlabMergeRequest[]> {
    let data = [...MOCK_MERGE_REQUESTS];
    if (from || to) { data = data.filter(m => this.inRange(m.created_at, from, to)); }
    if (state && state !== 'all') { data = data.filter(m => m.state === state); }
    return this.sim(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
  }



  getCommits(projectId: number, from?: string, to?: string, branch?: string): Observable<GitlabCommit[]> {
    let data = [...MOCK_COMMITS];
    if (from || to) { data = data.filter(c => this.inRange(c.authored_date, from, to)); }
    return this.sim(data.sort((a, b) => b.authored_date.localeCompare(a.authored_date)));
  }



  getBranches(projectId: number): Observable<GitlabBranch[]> {
    return this.sim(MOCK_BRANCHES);
  }

  getTags(projectId: number): Observable<GitlabTag[]> {
    return this.sim(MOCK_TAGS);
  }


  getIssues(projectId: number, from?: string, to?: string, state?: string): Observable<GitlabIssue[]> {
    let data = [...MOCK_ISSUES];
    if (from || to) { data = data.filter(i => this.inRange(i.created_at, from, to)); }
    if (state && state !== 'all') { data = data.filter(i => i.state === state); }
    return this.sim(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
  }



  getProjectMembers(projectId: number): Observable<GitlabMember[]> {
    return this.sim(MOCK_MEMBERS);
  }



  getPackages(projectId: number, from?: string, to?: string, type?: string): Observable<GitlabPackage[]> {
    let data = [...MOCK_PACKAGES];
    if (from || to) { data = data.filter(p => this.inRange(p.created_at, from, to)); }
    if (type && type !== 'all') { data = data.filter(p => p.package_type === type); }
    return this.sim(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
  }

 

  getEnvironments(projectId: number): Observable<GitlabEnvironment[]> {
    return this.sim(MOCK_ENVIRONMENTS);
  }

  getDeployments(projectId: number, from?: string, to?: string): Observable<GitlabDeployment[]> {
    let data = [...MOCK_DEPLOYMENTS];
    if (from || to) { data = data.filter(d => this.inRange(d.created_at, from, to)); }
    return this.sim(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
  }



  getContributors(projectId: number): Observable<GitlabContributor[]> {
    return this.sim([...MOCK_CONTRIBUTORS].sort((a, b) => b.commits - a.commits));
  }

  getRunners(projectId: number): Observable<GitlabRunner[]> {
    return this.sim(MOCK_RUNNERS);
  }



  loadDashboard(filter: DashboardFilter): Observable<DashboardData> {
    const { projectId, dateFrom, dateTo, pipelineStatus, mrState } = filter;
    const id = projectId ?? MOCK_PROJECTS[0].id;

    return combineLatest({
      project:       this.getProject(id),
      pipelines:     this.getPipelines(id, dateFrom, dateTo, pipelineStatus),
      mergeRequests: this.getMergeRequests(id, dateFrom, dateTo, mrState),
      commits:       this.getCommits(id, dateFrom, dateTo),
      branches:      this.getBranches(id),
      tags:          this.getTags(id),
      issues:        this.getIssues(id, dateFrom, dateTo),
      members:       this.getProjectMembers(id),
      packages:      this.getPackages(id, dateFrom, dateTo),
      environments:  this.getEnvironments(id),
      deployments:   this.getDeployments(id, dateFrom, dateTo),
      contributors:  this.getContributors(id),
      runners:       this.getRunners(id),
    }).pipe(
      map(data => ({ ...data, stats: this.computeStats(data) }))
    );
  }



  computeStats(data: Omit<DashboardData, 'stats'>): ProjectStats {
    const { pipelines, mergeRequests, issues, packages, members,
            commits, branches, tags, environments, deployments } = data;

    const pTotal    = pipelines.length;
    const pSuccess  = pipelines.filter(p => p.status === 'success').length;
    const durs      = pipelines.filter(p => p.duration != null).map(p => p.duration as number);
    const covs      = pipelines.filter(p => p.coverage != null).map(p => parseFloat(p.coverage!));
    const deplTotal   = deployments.length;
    const deplSuccess = deployments.filter(d => d.status === 'success').length;

    return {
      totalPipelines:      pTotal,
      successPipelines:    pSuccess,
      failedPipelines:     pipelines.filter(p => p.status === 'failed').length,
      runningPipelines:    pipelines.filter(p => p.status === 'running').length,
      canceledPipelines:   pipelines.filter(p => p.status === 'canceled').length,
      successRate:         pTotal ? Math.round(pSuccess / pTotal * 100) : 0,
      avgPipelineDuration: durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : 0,
      avgCoverage:         covs.length ? Math.round(covs.reduce((a, b) => a + b, 0) / covs.length * 10) / 10 : 0,
      totalMRs:            mergeRequests.length,
      openMRs:             mergeRequests.filter(m => m.state === 'opened').length,
      mergedMRs:           mergeRequests.filter(m => m.state === 'merged').length,
      closedMRs:           mergeRequests.filter(m => m.state === 'closed').length,
      draftMRs:            mergeRequests.filter(m => m.draft).length,
      totalIssues:         issues.length,
      openIssues:          issues.filter(i => i.state === 'opened').length,
      closedIssues:        issues.filter(i => i.state === 'closed').length,
      totalPackages:       packages.length,
      totalMembers:        members.length,
      totalCommits:        commits.length,
      totalBranches:       branches.length,
      totalTags:           tags.length,
      totalEnvironments:   environments.length,
      totalDeployments:    deplTotal,
      successDeployments:  deplSuccess,
    };
  }

  // ==========================================================
  // HEADERS (API réelle)
  // ==========================================================
  // private headers() {
  //   return { 'PRIVATE-TOKEN': this.token };
  // }
  //
  // constructor(private http: HttpClient) {}
}
