
import {
  GitlabProject, GitlabPipeline, GitlabMergeRequest, GitlabCommit,
  GitlabBranch, GitlabTag, GitlabIssue, GitlabMilestone, GitlabMember,
  GitlabPackage, GitlabEnvironment, GitlabDeployment, GitlabContributor, GitlabRunner,
} from '../models/gitlab.models';

// ── Users ────────────────────────────────────────────────────
const U = {
  youssef: { id: 10, name: 'Youssef Benali',   username: 'y.benali',    avatar_url: 'https://i.pravatar.cc/40?u=youssef', web_url: '#' },
  karim:   { id: 1,  name: 'Karim Amrani',     username: 'k.amrani',    avatar_url: 'https://i.pravatar.cc/40?u=karim',   web_url: '#' },
  mariem:  { id: 2,  name: 'Mariem Belhaj',    username: 'm.belhaj',    avatar_url: 'https://i.pravatar.cc/40?u=mariem',  web_url: '#' },
  sara:    { id: 3,  name: 'Sara Ait-Ahmed',   username: 's.ait',       avatar_url: 'https://i.pravatar.cc/40?u=sara',    web_url: '#' },
  yassine: { id: 4,  name: 'Yassine El-Kh.',  username: 'y.el-kh',     avatar_url: 'https://i.pravatar.cc/40?u=yassine', web_url: '#' },
  nadia:   { id: 5,  name: 'Nadia Messaoudi',  username: 'n.messaoudi', avatar_url: 'https://i.pravatar.cc/40?u=nadia',   web_url: '#' },
};

// ── Projects ─────────────────────────────────────────────────
export const MOCK_PROJECTS: GitlabProject[] = [
  {
    id: 101, name: 'web-app-backend', name_with_namespace: 'groupe-isi / web-app-backend',
    path_with_namespace: 'groupe-isi/web-app-backend', visibility: 'private',
    description: 'Application backend Node.js — pipeline CI/CD complet',
    web_url: '#', avatar_url: null, star_count: 3, forks_count: 1,
    open_issues_count: 4, last_activity_at: '2026-04-08T09:15:00Z',
    created_at: '2025-01-10T08:00:00Z', default_branch: 'main',
    namespace: { id: 50, name: 'groupe-isi', kind: 'group' },
    statistics: { commit_count: 284, storage_size: 14200000, repository_size: 9800000 },
  },
  {
    id: 102, name: 'frontend-angular', name_with_namespace: 'groupe-isi / frontend-angular',
    path_with_namespace: 'groupe-isi/frontend-angular', visibility: 'private',
    description: 'Application front Angular 21 avec PrimeNG et NgRx',
    web_url: '#', avatar_url: null, star_count: 5, forks_count: 2,
    open_issues_count: 7, last_activity_at: '2026-04-07T14:30:00Z',
    created_at: '2025-01-15T09:00:00Z', default_branch: 'main',
    namespace: { id: 50, name: 'groupe-isi', kind: 'group' },
    statistics: { commit_count: 412, storage_size: 38000000, repository_size: 24000000 },
  },
  {
    id: 103, name: 'mobile-app', name_with_namespace: 'groupe-isi / mobile-app',
    path_with_namespace: 'groupe-isi/mobile-app', visibility: 'internal',
    description: 'Application mobile React Native — iOS & Android',
    web_url: '#', avatar_url: null, star_count: 2, forks_count: 0,
    open_issues_count: 2, last_activity_at: '2026-04-06T11:00:00Z',
    created_at: '2025-03-01T10:00:00Z', default_branch: 'main',
    namespace: { id: 50, name: 'groupe-isi', kind: 'group' },
    statistics: { commit_count: 96, storage_size: 52000000, repository_size: 41000000 },
  },
  {
    id: 104, name: 'infra-terraform', name_with_namespace: 'groupe-isi / infra-terraform',
    path_with_namespace: 'groupe-isi/infra-terraform', visibility: 'private',
    description: 'Infrastructure as Code — AWS + Terraform + Ansible',
    web_url: '#', avatar_url: null, star_count: 1, forks_count: 0,
    open_issues_count: 1, last_activity_at: '2026-04-05T16:00:00Z',
    created_at: '2025-02-20T08:30:00Z', default_branch: 'main',
    namespace: { id: 50, name: 'groupe-isi', kind: 'group' },
    statistics: { commit_count: 58, storage_size: 2100000, repository_size: 1800000 },
  },
];

// ── Pipelines ────────────────────────────────────────────────
export const MOCK_PIPELINES: GitlabPipeline[] = [
  { id:1042, status:'success',  ref:'main',           sha:'a1b2c3', created_at:'2026-04-08T09:15:00Z', updated_at:'2026-04-08T09:19:00Z', duration:234, queued_duration:8,  coverage:'91.2', source:'push',              web_url:'#', user:U.karim   },
  { id:1041, status:'failed',   ref:'feature/auth',   sha:'b2c3d4', created_at:'2026-04-07T17:42:00Z', updated_at:'2026-04-07T17:44:00Z', duration:72,  queued_duration:5,  coverage:null,   source:'push',              web_url:'#', user:U.mariem  },
  { id:1040, status:'success',  ref:'develop',        sha:'c3d4e5', created_at:'2026-04-07T14:20:00Z', updated_at:'2026-04-07T14:25:00Z', duration:270, queued_duration:12, coverage:'88.7', source:'merge_request_event',web_url:'#', user:U.sara    },
  { id:1039, status:'running',  ref:'hotfix/login',   sha:'d4e5f6', created_at:'2026-04-08T10:01:00Z', updated_at:'2026-04-08T10:01:00Z', duration:null,queued_duration:3,  coverage:null,   source:'push',              web_url:'#', user:U.karim   },
  { id:1038, status:'success',  ref:'main',           sha:'e5f6g7', created_at:'2026-04-06T11:00:00Z', updated_at:'2026-04-06T11:05:00Z', duration:305, queued_duration:9,  coverage:'89.4', source:'schedule',          web_url:'#', user:U.youssef },
  { id:1037, status:'failed',   ref:'feature/api',    sha:'f6g7h8', created_at:'2026-04-05T16:30:00Z', updated_at:'2026-04-05T16:32:00Z', duration:138, queued_duration:6,  coverage:null,   source:'push',              web_url:'#', user:U.yassine },
  { id:1036, status:'success',  ref:'develop',        sha:'g7h8i9', created_at:'2026-04-04T09:45:00Z', updated_at:'2026-04-04T09:49:00Z', duration:240, queued_duration:7,  coverage:'87.1', source:'push',              web_url:'#', user:U.nadia   },
  { id:1035, status:'canceled', ref:'feature/ui',     sha:'h8i9j0', created_at:'2026-04-03T13:22:00Z', updated_at:'2026-04-03T13:23:00Z', duration:45,  queued_duration:4,  coverage:null,   source:'push',              web_url:'#', user:U.sara    },
  { id:1034, status:'success',  ref:'main',           sha:'i9j0k1', created_at:'2026-04-02T10:00:00Z', updated_at:'2026-04-02T10:05:00Z', duration:260, queued_duration:10, coverage:'90.0', source:'schedule',          web_url:'#', user:U.karim   },
  { id:1033, status:'success',  ref:'develop',        sha:'j0k1l2', created_at:'2026-04-01T15:30:00Z', updated_at:'2026-04-01T15:34:00Z', duration:245, queued_duration:8,  coverage:'88.5', source:'push',              web_url:'#', user:U.mariem  },
  { id:1032, status:'failed',   ref:'feature/tests',  sha:'k1l2m3', created_at:'2026-03-31T09:10:00Z', updated_at:'2026-03-31T09:11:00Z', duration:82,  queued_duration:5,  coverage:null,   source:'push',              web_url:'#', user:U.yassine },
  { id:1031, status:'success',  ref:'main',           sha:'l2m3n4', created_at:'2026-03-30T14:00:00Z', updated_at:'2026-03-30T14:05:00Z', duration:275, queued_duration:9,  coverage:'87.8', source:'schedule',          web_url:'#', user:U.youssef },
  { id:1030, status:'success',  ref:'develop',        sha:'m3n4o5', created_at:'2026-03-28T10:00:00Z', updated_at:'2026-03-28T10:05:00Z', duration:258, queued_duration:7,  coverage:'86.9', source:'push',              web_url:'#', user:U.karim   },
  { id:1029, status:'failed',   ref:'feature/docker', sha:'n4o5p6', created_at:'2026-03-25T11:00:00Z', updated_at:'2026-03-25T11:02:00Z', duration:95,  queued_duration:5,  coverage:null,   source:'push',              web_url:'#', user:U.nadia   },
  { id:1028, status:'success',  ref:'main',           sha:'o5p6q7', created_at:'2026-03-22T09:00:00Z', updated_at:'2026-03-22T09:05:00Z', duration:280, queued_duration:11, coverage:'90.3', source:'schedule',          web_url:'#', user:U.youssef },
  { id:1027, status:'success',  ref:'develop',        sha:'p6q7r8', created_at:'2026-03-20T14:00:00Z', updated_at:'2026-03-20T14:04:00Z', duration:243, queued_duration:8,  coverage:'88.1', source:'push',              web_url:'#', user:U.mariem  },
  { id:1026, status:'canceled', ref:'feature/sonar',  sha:'q7r8s9', created_at:'2026-03-18T10:00:00Z', updated_at:'2026-03-18T10:01:00Z', duration:30,  queued_duration:3,  coverage:null,   source:'push',              web_url:'#', user:U.sara    },
  { id:1025, status:'success',  ref:'main',           sha:'r8s9t0', created_at:'2026-03-15T08:00:00Z', updated_at:'2026-03-15T08:05:00Z', duration:265, queued_duration:9,  coverage:'89.7', source:'schedule',          web_url:'#', user:U.karim   },
  { id:1024, status:'failed',   ref:'feature/ci',     sha:'s9t0u1', created_at:'2026-03-12T16:00:00Z', updated_at:'2026-03-12T16:01:00Z', duration:60,  queued_duration:4,  coverage:null,   source:'push',              web_url:'#', user:U.nadia   },
  { id:1023, status:'success',  ref:'main',           sha:'t0u1v2', created_at:'2026-03-10T10:00:00Z', updated_at:'2026-03-10T10:05:00Z', duration:271, queued_duration:8,  coverage:'88.9', source:'schedule',          web_url:'#', user:U.youssef },
];

// ── Merge Requests ───────────────────────────────────────────
export const MOCK_MERGE_REQUESTS: GitlabMergeRequest[] = [
  { id:201, iid:18, title:'Refactor auth middleware',               description:'Refactoring complet du middleware d\'authentification JWT.',           state:'opened', draft:false, author:U.karim,   assignees:[U.karim],   reviewers:[U.mariem],  source_branch:'feature/auth',    target_branch:'develop', created_at:'2026-04-06T08:00:00Z', updated_at:'2026-04-07T10:00:00Z', merged_at:null,                   closed_at:null, web_url:'#', user_notes_count:3,  changes_count:'12', labels:['backend'],            milestone:null, merge_status:'can_be_merged', sha:'b2c3d4', squash:false, time_stats:{time_estimate:3600,  total_time_spent:2800}  },
  { id:202, iid:17, title:'Add JWT token refresh endpoint',         description:'Ajout d\'un endpoint pour le refresh des tokens JWT.',                 state:'merged', draft:false, author:U.mariem,  assignees:[U.mariem],  reviewers:[U.karim],   source_branch:'feature/jwt',     target_branch:'develop', created_at:'2026-04-02T09:00:00Z', updated_at:'2026-04-04T11:00:00Z', merged_at:'2026-04-04T11:00:00Z', closed_at:null, web_url:'#', user_notes_count:5,  changes_count:'24', labels:['backend','security'], milestone:null, merge_status:'merged',        sha:'b3c4d5', squash:false, time_stats:{time_estimate:7200,  total_time_spent:5400}  },
  { id:203, iid:16, title:'Fix database connection pool leak',      description:'Correction d\'une fuite mémoire dans le pool de connexions.',         state:'merged', draft:false, author:U.sara,    assignees:[U.sara],    reviewers:[U.mariem],  source_branch:'hotfix/db',       target_branch:'main',    created_at:'2026-03-31T07:30:00Z', updated_at:'2026-03-31T14:00:00Z', merged_at:'2026-03-31T14:00:00Z', closed_at:null, web_url:'#', user_notes_count:2,  changes_count:'6',  labels:['bug','hotfix'],       milestone:null, merge_status:'merged',        sha:'c4d5e6', squash:true,  time_stats:{time_estimate:1800,  total_time_spent:1200}  },
  { id:204, iid:15, title:'Add unit tests for user service',        description:'Couverture de tests pour le service utilisateur.',                     state:'opened', draft:false, author:U.yassine, assignees:[U.yassine], reviewers:[U.sara],    source_branch:'feature/tests',   target_branch:'develop', created_at:'2026-04-05T13:00:00Z', updated_at:'2026-04-06T09:00:00Z', merged_at:null,                   closed_at:null, web_url:'#', user_notes_count:1,  changes_count:'34', labels:['testing'],            milestone:null, merge_status:'can_be_merged', sha:'d5e6f7', squash:false, time_stats:{time_estimate:5400,  total_time_spent:4200}  },
  { id:205, iid:14, title:'Docker image optimisation (multi-stage)',description:'Optimisation des images Docker avec multi-stage builds.',              state:'merged', draft:false, author:U.karim,   assignees:[U.karim],   reviewers:[U.mariem],  source_branch:'feature/docker',  target_branch:'develop', created_at:'2026-03-28T10:00:00Z', updated_at:'2026-03-30T16:00:00Z', merged_at:'2026-03-30T16:00:00Z', closed_at:null, web_url:'#', user_notes_count:4,  changes_count:'18', labels:['devops'],             milestone:null, merge_status:'merged',        sha:'e6f7g8', squash:false, time_stats:{time_estimate:3600,  total_time_spent:3000}  },
  { id:206, iid:13, title:'Setup SonarQube quality gate',           description:'Intégration SonarQube dans le pipeline CI.',                          state:'closed', draft:false, author:U.mariem,  assignees:[],          reviewers:[],          source_branch:'feature/sonar',   target_branch:'develop', created_at:'2026-03-20T09:00:00Z', updated_at:'2026-03-22T10:00:00Z', merged_at:null,                   closed_at:'2026-03-22T10:00:00Z', web_url:'#', user_notes_count:7,  changes_count:'9',  labels:['quality'],            milestone:null, merge_status:'cannot_be_merged',sha:'f7g8h9', squash:false, time_stats:{time_estimate:0,     total_time_spent:0}     },
  { id:207, iid:12, title:'CI pipeline: add deploy staging stage',  description:'Ajout d\'un stage de déploiement vers l\'environnement staging.',     state:'merged', draft:false, author:U.nadia,   assignees:[U.nadia],   reviewers:[U.karim],   source_branch:'feature/ci',      target_branch:'develop', created_at:'2026-03-15T11:00:00Z', updated_at:'2026-03-17T14:00:00Z', merged_at:'2026-03-17T14:00:00Z', closed_at:null, web_url:'#', user_notes_count:2,  changes_count:'45', labels:['devops','ci'],        milestone:null, merge_status:'merged',        sha:'g8h9i0', squash:false, time_stats:{time_estimate:7200,  total_time_spent:6000}  },
  { id:208, iid:11, title:'Add Swagger API documentation',          description:'Documentation complète de l\'API REST avec Swagger/OpenAPI 3.0.',     state:'opened', draft:true,  author:U.sara,    assignees:[U.sara],    reviewers:[U.yassine], source_branch:'feature/swagger', target_branch:'develop', created_at:'2026-04-07T15:00:00Z', updated_at:'2026-04-08T08:00:00Z', merged_at:null,                   closed_at:null, web_url:'#', user_notes_count:0,  changes_count:'28', labels:['docs'],               milestone:null, merge_status:'can_be_merged', sha:'h9i0j1', squash:false, time_stats:{time_estimate:3600,  total_time_spent:1200}  },
  { id:209, iid:10, title:'Add Redis caching layer',                description:'Mise en place d\'un cache Redis pour les requêtes fréquentes.',       state:'merged', draft:false, author:U.yassine, assignees:[U.yassine], reviewers:[U.karim],   source_branch:'feature/redis',   target_branch:'develop', created_at:'2026-03-10T09:00:00Z', updated_at:'2026-03-12T14:00:00Z', merged_at:'2026-03-12T14:00:00Z', closed_at:null, web_url:'#', user_notes_count:6,  changes_count:'52', labels:['backend','perf'],     milestone:null, merge_status:'merged',        sha:'i0j1k2', squash:false, time_stats:{time_estimate:10800, total_time_spent:9000}  },
  { id:210, iid:9,  title:'Upgrade Node.js 18 → 22',               description:'Mise à jour de Node.js vers la version LTS 22.',                      state:'merged', draft:false, author:U.nadia,   assignees:[U.nadia],   reviewers:[U.youssef], source_branch:'chore/node-22',   target_branch:'main',    created_at:'2026-03-05T10:00:00Z', updated_at:'2026-03-07T11:00:00Z', merged_at:'2026-03-07T11:00:00Z', closed_at:null, web_url:'#', user_notes_count:3,  changes_count:'8',  labels:['chore'],              milestone:null, merge_status:'merged',        sha:'j1k2l3', squash:false, time_stats:{time_estimate:1800,  total_time_spent:1500}  },
];

// ── Members ──────────────────────────────────────────────────
export const MOCK_MEMBERS: GitlabMember[] = [
  { id:10, name:'Youssef Benali',   username:'y.benali',    avatar_url:'https://i.pravatar.cc/40?u=youssef', access_level:50, expires_at:null, web_url:'#' },
  { id:1,  name:'Karim Amrani',     username:'k.amrani',    avatar_url:'https://i.pravatar.cc/40?u=karim',   access_level:40, expires_at:null, web_url:'#' },
  { id:2,  name:'Mariem Belhaj',    username:'m.belhaj',    avatar_url:'https://i.pravatar.cc/40?u=mariem',  access_level:40, expires_at:null, web_url:'#' },
  { id:3,  name:'Sara Ait-Ahmed',   username:'s.ait',       avatar_url:'https://i.pravatar.cc/40?u=sara',    access_level:30, expires_at:null, web_url:'#' },
  { id:4,  name:'Yassine El-Kh.',  username:'y.el-kh',     avatar_url:'https://i.pravatar.cc/40?u=yassine', access_level:30, expires_at:null, web_url:'#' },
  { id:5,  name:'Nadia Messaoudi',  username:'n.messaoudi', avatar_url:'https://i.pravatar.cc/40?u=nadia',   access_level:30, expires_at:null, web_url:'#' },
];

// ── Packages ─────────────────────────────────────────────────
export const MOCK_PACKAGES: GitlabPackage[] = [
  { id:301, name:'@isi/backend-core', version:'1.4.2', package_type:'npm',    created_at:'2026-04-05T10:00:00Z', last_downloaded_at:'2026-04-08T07:00:00Z', _links:{web_path:'#'} },
  { id:302, name:'@isi/backend-core', version:'1.4.1', package_type:'npm',    created_at:'2026-03-28T10:00:00Z', last_downloaded_at:'2026-04-04T09:00:00Z', _links:{web_path:'#'} },
  { id:303, name:'@isi/auth-utils',   version:'2.0.0', package_type:'npm',    created_at:'2026-04-01T10:00:00Z', last_downloaded_at:'2026-04-07T10:00:00Z', _links:{web_path:'#'} },
  { id:304, name:'@isi/db-helpers',   version:'0.9.3', package_type:'npm',    created_at:'2026-03-15T10:00:00Z', last_downloaded_at:'2026-04-06T08:00:00Z', _links:{web_path:'#'} },
  { id:305, name:'@isi/logger',       version:'1.1.0', package_type:'npm',    created_at:'2026-03-10T10:00:00Z', last_downloaded_at:'2026-04-03T11:00:00Z', _links:{web_path:'#'} },
  { id:306, name:'web-app-backend',   version:'latest',package_type:'docker', created_at:'2026-04-08T09:20:00Z', last_downloaded_at:'2026-04-08T09:21:00Z', _links:{web_path:'#'} },
  { id:307, name:'web-app-backend',   version:'1.4.2', package_type:'docker', created_at:'2026-04-05T10:10:00Z', last_downloaded_at:'2026-04-07T12:00:00Z', _links:{web_path:'#'} },
  { id:308, name:'web-app-backend',   version:'1.4.1', package_type:'docker', created_at:'2026-03-28T10:10:00Z', last_downloaded_at:'2026-04-01T08:00:00Z', _links:{web_path:'#'} },
];

// ── Commits ──────────────────────────────────────────────────
export const MOCK_COMMITS: GitlabCommit[] = [
  { id:'a1b2c3d4e5f6', short_id:'a1b2c3d', title:'fix: resolve JWT expiry edge case', author_name:'Karim Amrani',    author_email:'k.amrani@isi.ma',    authored_date:'2026-04-08T09:10:00Z', committed_date:'2026-04-08T09:10:00Z', message:'fix: resolve JWT expiry edge case\n\nCloses #42', web_url:'#', stats:{additions:14, deletions:6, total:20} },
  { id:'b2c3d4e5f6g7', short_id:'b2c3d4e', title:'feat: add rate limiting middleware',  author_name:'Mariem Belhaj',   author_email:'m.belhaj@isi.ma',    authored_date:'2026-04-07T17:00:00Z', committed_date:'2026-04-07T17:00:00Z', message:'feat: add rate limiting middleware',              web_url:'#', stats:{additions:78, deletions:2, total:80} },
  { id:'c3d4e5f6g7h8', short_id:'c3d4e5f', title:'refactor: clean up user controller',  author_name:'Sara Ait-Ahmed',  author_email:'s.ait@isi.ma',       authored_date:'2026-04-07T14:15:00Z', committed_date:'2026-04-07T14:15:00Z', message:'refactor: clean up user controller',             web_url:'#', stats:{additions:32, deletions:45, total:77} },
  { id:'d4e5f6g7h8i9', short_id:'d4e5f6g', title:'test: add unit tests for auth svc',   author_name:'Yassine El-Kh.', author_email:'y.el-kh@isi.ma',     authored_date:'2026-04-06T11:00:00Z', committed_date:'2026-04-06T11:00:00Z', message:'test: add unit tests for auth svc',              web_url:'#', stats:{additions:156,deletions:0, total:156}},
  { id:'e5f6g7h8i9j0', short_id:'e5f6g7h', title:'chore: update dependencies',           author_name:'Nadia Messaoudi',author_email:'n.messaoudi@isi.ma', authored_date:'2026-04-05T09:00:00Z', committed_date:'2026-04-05T09:00:00Z', message:'chore: update dependencies',                     web_url:'#', stats:{additions:24, deletions:24, total:48} },
  { id:'f6g7h8i9j0k1', short_id:'f6g7h8i', title:'docs: update API documentation',       author_name:'Sara Ait-Ahmed',  author_email:'s.ait@isi.ma',       authored_date:'2026-04-04T15:30:00Z', committed_date:'2026-04-04T15:30:00Z', message:'docs: update API documentation',                 web_url:'#', stats:{additions:89, deletions:12, total:101}},
  { id:'g7h8i9j0k1l2', short_id:'g7h8i9j', title:'fix: database timeout in production',  author_name:'Karim Amrani',    author_email:'k.amrani@isi.ma',    authored_date:'2026-04-03T18:00:00Z', committed_date:'2026-04-03T18:00:00Z', message:'fix: database timeout in production\n\nFixes #38',web_url:'#', stats:{additions:8,  deletions:3, total:11} },
  { id:'h8i9j0k1l2m3', short_id:'h8i9j0k', title:'feat: implement Redis cache layer',    author_name:'Yassine El-Kh.', author_email:'y.el-kh@isi.ma',     authored_date:'2026-04-02T10:00:00Z', committed_date:'2026-04-02T10:00:00Z', message:'feat: implement Redis cache layer',               web_url:'#', stats:{additions:245,deletions:18,total:263}},
];

// ── Branches ─────────────────────────────────────────────────
export const MOCK_BRANCHES: GitlabBranch[] = [
  { name:'main',           merged:false, protected:true,  default:true,  can_push:false, web_url:'#', commit:{id:'a1b2c3d4e5f6',short_id:'a1b2c3d',title:'fix: resolve JWT expiry edge case',   authored_date:'2026-04-08T09:10:00Z'} },
  { name:'develop',        merged:false, protected:true,  default:false, can_push:false, web_url:'#', commit:{id:'c3d4e5f6g7h8',short_id:'c3d4e5f',title:'refactor: clean up user controller', authored_date:'2026-04-07T14:15:00Z'} },
  { name:'feature/auth',   merged:false, protected:false, default:false, can_push:true,  web_url:'#', commit:{id:'b2c3d4e5f6g7',short_id:'b2c3d4e',title:'feat: add rate limiting middleware',  authored_date:'2026-04-07T17:00:00Z'} },
  { name:'feature/swagger',merged:false, protected:false, default:false, can_push:true,  web_url:'#', commit:{id:'f6g7h8i9j0k1',short_id:'f6g7h8i',title:'docs: update API documentation',     authored_date:'2026-04-04T15:30:00Z'} },
  { name:'feature/tests',  merged:false, protected:false, default:false, can_push:true,  web_url:'#', commit:{id:'d4e5f6g7h8i9',short_id:'d4e5f6g',title:'test: add unit tests for auth svc',  authored_date:'2026-04-06T11:00:00Z'} },
  { name:'hotfix/login',   merged:false, protected:false, default:false, can_push:true,  web_url:'#', commit:{id:'g7h8i9j0k1l2',short_id:'g7h8i9j',title:'fix: database timeout in production',authored_date:'2026-04-03T18:00:00Z'} },
  { name:'release/1.5.0',  merged:false, protected:true,  default:false, can_push:false, web_url:'#', commit:{id:'e5f6g7h8i9j0',short_id:'e5f6g7h',title:'chore: update dependencies',          authored_date:'2026-04-05T09:00:00Z'} },
];

// ── Tags ─────────────────────────────────────────────────────
export const MOCK_TAGS: GitlabTag[] = [
  { name:'v1.4.2', message:'Release v1.4.2 — auth fixes & performance improvements', target:'a1b2c3d4e5f6', commit:{id:'a1b2c3d4e5f6',short_id:'a1b2c3d',title:'fix: resolve JWT expiry edge case',   created_at:'2026-04-08T10:00:00Z'}, release:{tag_name:'v1.4.2',description:'## What\'s new\n- Fixed JWT expiry\n- Rate limiting added'} },
  { name:'v1.4.1', message:'Release v1.4.1 — stability patch',                       target:'e5f6g7h8i9j0', commit:{id:'e5f6g7h8i9j0',short_id:'e5f6g7h',title:'chore: update dependencies',          created_at:'2026-04-05T10:00:00Z'}, release:{tag_name:'v1.4.1',description:'## Patch\n- Dependency updates\n- Minor bug fixes'} },
  { name:'v1.4.0', message:'Release v1.4.0 — Redis cache layer',                     target:'h8i9j0k1l2m3', commit:{id:'h8i9j0k1l2m3',short_id:'h8i9j0k',title:'feat: implement Redis cache layer',  created_at:'2026-04-02T10:00:00Z'}, release:{tag_name:'v1.4.0',description:'## Features\n- Redis caching\n- Performance improvements'} },
  { name:'v1.3.0', message:'Release v1.3.0 — Docker optimisation',                   target:'g7h8i9j0k1l2', commit:{id:'g7h8i9j0k1l2',short_id:'g7h8i9j',title:'Docker image optimisation',           created_at:'2026-03-30T16:00:00Z'}, release:{tag_name:'v1.3.0',description:'## Features\n- Multi-stage Docker builds'} },
];

// ── Issues ───────────────────────────────────────────────────
export const MOCK_ISSUES: GitlabIssue[] = [
  { id:401, iid:12, title:'API timeout under high load',                  state:'opened', author:U.karim,   assignees:[U.yassine], labels:['bug','priority::high'],  milestone:null, created_at:'2026-04-07T09:00:00Z', updated_at:'2026-04-08T08:00:00Z', closed_at:null,                   due_date:null,          web_url:'#', user_notes_count:4, upvotes:3, downvotes:0 },
  { id:402, iid:11, title:'Swagger docs missing auth endpoints',           state:'opened', author:U.sara,    assignees:[U.sara],    labels:['docs'],                  milestone:null, created_at:'2026-04-06T14:00:00Z', updated_at:'2026-04-07T10:00:00Z', closed_at:null,                   due_date:'2026-04-15',  web_url:'#', user_notes_count:1, upvotes:1, downvotes:0 },
  { id:403, iid:10, title:'Memory leak in session handler',                state:'closed', author:U.mariem,  assignees:[U.karim],   labels:['bug','hotfix'],          milestone:null, created_at:'2026-03-30T10:00:00Z', updated_at:'2026-03-31T14:00:00Z', closed_at:'2026-03-31T14:00:00Z',due_date:null,          web_url:'#', user_notes_count:6, upvotes:2, downvotes:0 },
  { id:404, iid:9,  title:'Add pagination to /users endpoint',             state:'opened', author:U.yassine, assignees:[U.mariem],  labels:['enhancement'],           milestone:null, created_at:'2026-04-05T11:00:00Z', updated_at:'2026-04-06T09:00:00Z', closed_at:null,                   due_date:null,          web_url:'#', user_notes_count:2, upvotes:4, downvotes:0 },
  { id:405, iid:8,  title:'CI fails on Node 22 with ESM modules',          state:'closed', author:U.nadia,   assignees:[U.nadia],   labels:['bug','ci'],              milestone:null, created_at:'2026-03-25T09:00:00Z', updated_at:'2026-03-27T16:00:00Z', closed_at:'2026-03-27T16:00:00Z',due_date:null,          web_url:'#', user_notes_count:8, upvotes:5, downvotes:0 },
  { id:406, iid:7,  title:'Add health check endpoint',                     state:'opened', author:U.karim,   assignees:[],          labels:['feature'],               milestone:null, created_at:'2026-04-03T10:00:00Z', updated_at:'2026-04-04T09:00:00Z', closed_at:null,                   due_date:null,          web_url:'#', user_notes_count:0, upvotes:2, downvotes:0 },
  { id:407, iid:6,  title:'Database backup strategy missing',              state:'opened', author:U.youssef, assignees:[U.karim],   labels:['priority::critical'],    milestone:null, created_at:'2026-04-01T08:00:00Z', updated_at:'2026-04-02T10:00:00Z', closed_at:null,                   due_date:'2026-04-10',  web_url:'#', user_notes_count:5, upvotes:6, downvotes:0 },
];

// ── Environments ─────────────────────────────────────────────
export const MOCK_ENVIRONMENTS: GitlabEnvironment[] = [
  { id:501, name:'production', slug:'production', state:'available', external_url:'https://api.isi-app.ma',         web_url:'#', last_deployment:{id:601,status:'success',created_at:'2026-04-08T09:20:00Z', deployable:{id:801,name:'deploy',pipeline:{id:1042}}} },
  { id:502, name:'staging',    slug:'staging',    state:'available', external_url:'https://staging.api.isi-app.ma', web_url:'#', last_deployment:{id:602,status:'success',created_at:'2026-04-07T14:30:00Z', deployable:{id:802,name:'deploy',pipeline:{id:1040}}} },
  { id:503, name:'review/auth',slug:'review-auth',state:'available', external_url:'https://review-auth.api.isi.ma', web_url:'#', last_deployment:{id:603,status:'running',created_at:'2026-04-08T10:05:00Z', deployable:{id:803,name:'deploy',pipeline:{id:1039}}} },
  { id:504, name:'development',slug:'development',state:'available', external_url:'https://dev.api.isi-app.ma',     web_url:'#', last_deployment:{id:604,status:'success',created_at:'2026-04-06T11:10:00Z', deployable:{id:804,name:'deploy',pipeline:{id:1038}}} },
];

// ── Deployments ──────────────────────────────────────────────
export const MOCK_DEPLOYMENTS: GitlabDeployment[] = [
  { id:601, iid:15, ref:'main',         sha:'a1b2c3', status:'success', created_at:'2026-04-08T09:20:00Z', updated_at:'2026-04-08T09:25:00Z', environment:{id:501,name:'production'}, deployable:{id:801,name:'deploy',pipeline:{id:1042}}, user:U.karim   },
  { id:602, iid:14, ref:'develop',      sha:'c3d4e5', status:'success', created_at:'2026-04-07T14:30:00Z', updated_at:'2026-04-07T14:34:00Z', environment:{id:502,name:'staging'},    deployable:{id:802,name:'deploy',pipeline:{id:1040}}, user:U.mariem  },
  { id:603, iid:13, ref:'hotfix/login', sha:'d4e5f6', status:'running', created_at:'2026-04-08T10:05:00Z', updated_at:'2026-04-08T10:05:00Z', environment:{id:503,name:'review/auth'},deployable:{id:803,name:'deploy',pipeline:{id:1039}}, user:U.karim   },
  { id:604, iid:12, ref:'main',         sha:'e5f6g7', status:'success', created_at:'2026-04-06T11:10:00Z', updated_at:'2026-04-06T11:14:00Z', environment:{id:504,name:'development'},deployable:{id:804,name:'deploy',pipeline:{id:1038}}, user:U.youssef },
  { id:605, iid:11, ref:'develop',      sha:'g7h8i9', status:'success', created_at:'2026-04-04T09:55:00Z', updated_at:'2026-04-04T09:58:00Z', environment:{id:502,name:'staging'},    deployable:{id:805,name:'deploy',pipeline:{id:1036}}, user:U.nadia   },
  { id:606, iid:10, ref:'main',         sha:'i9j0k1', status:'failed',  created_at:'2026-04-02T10:10:00Z', updated_at:'2026-04-02T10:11:00Z', environment:{id:501,name:'production'}, deployable:{id:806,name:'deploy',pipeline:{id:1034}}, user:U.karim   },
];

// ── Contributors ─────────────────────────────────────────────
export const MOCK_CONTRIBUTORS: GitlabContributor[] = [
  { name:'Karim Amrani',    email:'k.amrani@isi.ma',    commits:98,  additions:4820, deletions:1230 },
  { name:'Mariem Belhaj',   email:'m.belhaj@isi.ma',    commits:74,  additions:3640, deletions:890  },
  { name:'Sara Ait-Ahmed',  email:'s.ait@isi.ma',       commits:52,  additions:2810, deletions:640  },
  { name:'Yassine El-Kh.', email:'y.el-kh@isi.ma',     commits:38,  additions:1980, deletions:420  },
  { name:'Nadia Messaoudi', email:'n.messaoudi@isi.ma', commits:22,  additions:1120, deletions:280  },
];

// ── Runners ──────────────────────────────────────────────────
export const MOCK_RUNNERS: GitlabRunner[] = [
  { id:701, description:'docker-runner-01', status:'online',  runner_type:'group_type',   is_shared:false, tag_list:['docker','linux'], run_untagged:false },
  { id:702, description:'docker-runner-02', status:'online',  runner_type:'group_type',   is_shared:false, tag_list:['docker','linux'], run_untagged:false },
  { id:703, description:'shared-runner-01', status:'online',  runner_type:'instance_type',is_shared:true,  tag_list:[],                 run_untagged:true  },
  { id:704, description:'docker-runner-03', status:'offline', runner_type:'group_type',   is_shared:false, tag_list:['docker','linux'], run_untagged:false },
];
