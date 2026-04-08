

export interface GitlabProject {
  id: number;
  name: string;
  name_with_namespace: string;
  path_with_namespace: string;
  description: string;
  web_url: string;
  avatar_url: string | null;
  star_count: number;
  forks_count: number;
  open_issues_count: number;
  visibility: 'private' | 'internal' | 'public';
  last_activity_at: string;
  created_at: string;
  default_branch: string;
  namespace: { id: number; name: string; kind: string };
  statistics?: {
    commit_count: number;
    storage_size: number;
    repository_size: number;
  };
}

export interface GitlabPipeline {
  id: number;
  status: 'success' | 'failed' | 'running' | 'pending' | 'canceled' | 'skipped' | 'manual';
  ref: string;
  sha: string;
  created_at: string;
  updated_at: string;
  duration: number | null;        // secondes
  queued_duration: number | null;
  coverage: string | null;        // '87.3'
  source: string;                 // 'push' | 'merge_request_event' | 'schedule' | 'web'
  web_url: string;
  user: GitlabUser;
}

export interface GitlabJob {
  id: number;
  name: string;
  stage: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'canceled' | 'skipped';
  duration: number | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  web_url: string;
  pipeline: { id: number };
  runner?: { id: number; description: string };
  artifacts_file?: { filename: string; size: number };
}

export interface GitlabMergeRequest {
  id: number;
  iid: number;
  title: string;
  description: string;
  state: 'opened' | 'closed' | 'locked' | 'merged';
  author: GitlabUser;
  assignees: GitlabUser[];
  reviewers: GitlabUser[];
  source_branch: string;
  target_branch: string;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  closed_at: string | null;
  web_url: string;
  user_notes_count: number;
  changes_count: string;
  labels: string[];
  milestone: GitlabMilestone | null;
  draft: boolean;
  merge_status: string;
  sha: string;
  squash: boolean;
  time_stats: { time_estimate: number; total_time_spent: number };
}

export interface GitlabCommit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committed_date: string;
  message: string;
  web_url: string;
  stats?: { additions: number; deletions: number; total: number };
}

export interface GitlabBranch {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  can_push: boolean;
  web_url: string;
  commit: { id: string; short_id: string; title: string; authored_date: string };
}

export interface GitlabTag {
  name: string;
  message: string;
  target: string;
  commit: { id: string; short_id: string; title: string; created_at: string };
  release: { tag_name: string; description: string } | null;
}

export interface GitlabIssue {
  id: number;
  iid: number;
  title: string;
  state: 'opened' | 'closed';
  author: GitlabUser;
  assignees: GitlabUser[];
  labels: string[];
  milestone: GitlabMilestone | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_date: string | null;
  web_url: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
}

export interface GitlabMilestone {
  id: number;
  iid: number;
  title: string;
  state: 'active' | 'closed';
  description: string;
  due_date: string | null;
  start_date: string | null;
  created_at: string;
  updated_at: string;
  web_url: string;
}

export interface GitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  web_url: string;
}

export interface GitlabMember {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  access_level: number; // 10=Guest 20=Reporter 30=Developer 40=Maintainer 50=Owner
  expires_at: string | null;
  web_url: string;
}

export interface GitlabPackage {
  id: number;
  name: string;
  version: string;
  package_type: 'npm' | 'docker' | 'maven' | 'pypi' | 'nuget' | 'helm' | 'generic';
  created_at: string;
  last_downloaded_at: string | null;
  _links: { web_path: string };
}

export interface GitlabEnvironment {
  id: number;
  name: string;
  slug: string;
  state: 'available' | 'stopped';
  external_url: string | null;
  web_url: string;
  last_deployment?: {
    id: number;
    status: string;
    created_at: string;
    deployable: { id: number; name: string; pipeline: { id: number } };
  };
}

export interface GitlabDeployment {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  status: 'created' | 'running' | 'success' | 'failed' | 'canceled' | 'blocked';
  created_at: string;
  updated_at: string;
  environment: { id: number; name: string };
  deployable: { id: number; name: string; pipeline: { id: number } };
  user: GitlabUser;
}

export interface GitlabContributor {
  name: string;
  email: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface GitlabRunner {
  id: number;
  description: string;
  status: 'online' | 'offline' | 'paused';
  runner_type: 'instance_type' | 'group_type' | 'project_type';
  is_shared: boolean;
  tag_list: string[];
  run_untagged: boolean;
}

// ── Dashboard Filter ─────────────────────────────────────────
export interface DashboardFilter {
  projectId: number | null;
  projectQuery: string;
  dateFrom: string;
  dateTo: string;
  pipelineStatus: string;
  mrState: string;
}

// ── Computed stats (frontend) ────────────────────────────────
export interface ProjectStats {
  // Pipelines
  totalPipelines: number;
  successPipelines: number;
  failedPipelines: number;
  runningPipelines: number;
  canceledPipelines: number;
  successRate: number;
  avgPipelineDuration: number;
  avgCoverage: number;
  // MRs
  totalMRs: number;
  openMRs: number;
  mergedMRs: number;
  closedMRs: number;
  draftMRs: number;
  // Issues
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  // Misc
  totalPackages: number;
  totalMembers: number;
  totalCommits: number;
  totalBranches: number;
  totalTags: number;
  totalEnvironments: number;
  totalDeployments: number;
  successDeployments: number;
}

export const ACCESS_LEVEL_LABELS: Record<number, string> = {
  10: 'Guest',
  20: 'Reporter',
  30: 'Developer',
  40: 'Maintainer',
  50: 'Owner',
};
