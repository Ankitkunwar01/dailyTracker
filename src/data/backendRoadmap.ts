export const backendRoadmapData = {
  categories: [
    {
      name: "Phase 1: Foundations",
      weeks: "Weeks 1–6",
      focus: "Building the ground floor",
      topics: [
        { 
          id: "br1-1", 
          title: "Language Depth & Internet Fundamentals", 
          weeks: "Week 1–2",
          description: "Pick Python, Go, or Node.js. Variables, functions, error handling. TCP/IP, DNS, HTTP/HTTPS cycle. Hit real APIs via Postman.",
          duration: "2 weeks" 
        },
        { 
          id: "br1-2", 
          title: "Build a Raw HTTP Server & Linux Fluency", 
          weeks: "Week 3–4",
          description: "Build a server using raw sockets (no framework). Master SSH, file permissions, cron, grep, and curl in the terminal.",
          duration: "2 weeks" 
        },
        { 
          id: "br1-3", 
          title: "SQL Fundamentals & Git Mastery", 
          weeks: "Week 5–6",
          description: "PostgreSQL fundamentals: CREATE, SELECT, JOIN, INDEX. Learn EXPLAIN. Git rebasing, merge conflicts, and git bisect.",
          duration: "2 weeks" 
        }
      ],
      project: "A URL shortener with PostgreSQL backend (no framework), redirect tracking + basic analytics. Deploy manually on a $5 VPS.",
      skip: ["Passive YouTube courses", "Memorizing syntax", "Learning multiple languages", "Frameworks before HTTP"]
    },
    {
      name: "Phase 2: Core Backend Skills",
      weeks: "Weeks 7–18",
      focus: "Where 90% of devs stop",
      topics: [
        { 
          id: "br2-1", 
          title: "REST API Design & Master One Framework", 
          weeks: "Week 7–8",
          description: "Resource naming, versioning, pagination. Master FastAPI, Express, or Gin from memory: middleware, routing, validation.",
          duration: "2 weeks" 
        },
        { 
          id: "br2-2", 
          title: "Database Design & Caching Basics", 
          weeks: "Week 9–11",
          description: "Normalization, transactions, ACID, migrations. Kill N+1 queries. Redis cache-aside, TTL, and session storage.",
          duration: "3 weeks" 
        },
        { 
          id: "br2-3", 
          title: "Authentication Done Right", 
          weeks: "Week 11–13",
          description: "OAuth 2.0 flow, password hashing (bcrypt), token refresh, CSRF protection, and session fixation.",
          duration: "2 weeks" 
        },
        { 
          id: "br2-4", 
          title: "Async, Queues & Background Jobs", 
          weeks: "Week 12–14",
          description: "Event loops vs goroutines. Message queues: RabbitMQ or Redis queues. Celery / BullMQ worker patterns.",
          duration: "2 weeks" 
        },
        { 
          id: "br2-5", 
          title: "Testing & Docker", 
          weeks: "Week 14–18",
          description: "Unit, integration, and API tests. Mocking. Test-driven debugging. Dockerfiles, Compose, layer caching, multi-stage builds.",
          duration: "4 weeks" 
        }
      ],
      project: "Full auth system (register, login, JWT refresh, OAuth) + email queue with workers. Containerize with Docker Compose.",
      skip: ["Memorizing all status codes", "GraphQL before REST", "Microservices before monolith", "NoSQL before SQL"]
    },
    {
      name: "Phase 3: Production-Grade Thinking",
      weeks: "Weeks 19–28",
      focus: "Separating from the pack",
      topics: [
        { 
          id: "br3-1", 
          title: "CI/CD & Observability", 
          weeks: "Week 19–21",
          description: "GitHub Actions/GitLab CI. Automated tests on PR. Structured logs (JSON), correlation IDs, Grafana + Loki/Datadog.",
          duration: "3 weeks" 
        },
        { 
          id: "br3-2", 
          title: "Cloud Fundamentals (AWS/GCP)", 
          weeks: "Week 21–23",
          description: "EC2, RDS, S3, SQS, IAM roles. VPCs, security groups. Managed services vs self-hosted trade-offs.",
          duration: "2 weeks" 
        },
        { 
          id: "br3-3", 
          title: "Performance Profiling", 
          weeks: "Week 22–24",
          description: "Flame graphs, slow query logs, p95/p99 latency. Load testing with k6 or Locust.",
          duration: "2 weeks" 
        },
        { 
          id: "br3-4", 
          title: "Security in Depth", 
          weeks: "Week 24–26",
          description: "OWASP Top 10. SQL injection, XSS, SSRF, IDOR. Secrets management (env vars, not code).",
          duration: "2 weeks" 
        },
        { 
          id: "br3-5", 
          title: "API Design at Scale", 
          weeks: "Week 26–28",
          description: "Idempotency keys, webhook design, versioning strategy, OpenAPI spec, backward compatibility.",
          duration: "2 weeks" 
        }
      ],
      project: "Deploy real app to AWS/GCP with CI/CD, structured logging, metrics, alerts, and load testing optimization.",
      skip: ["Kubernetes too early", "Dashboards with no data", "Learning every cloud service"]
    },
    {
      name: "Phase 4: Advanced Systems",
      weeks: "Weeks 29–42",
      focus: "Engineering at scale",
      topics: [
        { 
          id: "br4-1", 
          title: "System Design & Database Scaling", 
          weeks: "Week 29–33",
          description: "CAP theorem, consistency models, horizontal scaling. Read replicas, PgBouncer, sharding, zero-downtime migrations.",
          duration: "4 weeks" 
        },
        { 
          id: "br4-2", 
          title: "Kafka & Event Streaming", 
          weeks: "Week 33–35",
          description: "Kafka partitions, consumer groups, exactly-once semantics, event sourcing, dead letter queues.",
          duration: "2 weeks" 
        },
        { 
          id: "br4-3", 
          title: "Microservices & Kubernetes", 
          weeks: "Week 35–39",
          description: "gRPC vs REST for internal, service mesh, OpenTelemetry. Pods, services, ingress, HPA.",
          duration: "4 weeks" 
        },
        { 
          id: "br4-4", 
          title: "Reliability Engineering", 
          weeks: "Week 39–42",
          description: "SLOs, SLIs, error budgets, circuit breakers, retry with backoff, chaos engineering, incident response.",
          duration: "3 weeks" 
        }
      ],
      project: "Design for 10k req/sec on paper. Kafka-based streaming between services. Set SLOs and fix intentional breaks.",
      skip: ["Building your own consensus algorithm", "Distributed systems for low traffic", "Kafka before simple queues"]
    },
    {
      name: "Phase 5: Top 1% Differentiators",
      weeks: "Weeks 43–52",
      focus: "The master craftsmen",
      topics: [
        { 
          id: "br5-1", 
          title: "Production Codebases & OSS", 
          weeks: "Week 43–46",
          description: "Read Postgres/Redis internals. Fix real bugs in major projects. Senior engineer code reviews.",
          duration: "4 weeks" 
        },
        { 
          id: "br5-2", 
          title: "Writing & Specialty", 
          weeks: "Week 46–49",
          description: "Technical blog, teardowns, postmortems. Deep-dive into search infra, payments, or ML pipelines.",
          duration: "3 weeks" 
        },
        { 
          id: "br5-3", 
          title: "Systems Thinking & Real World Build", 
          weeks: "Week 49–52",
          description: "Defend trade-offs, not choices. Build something real with users that breaks in real ways.",
          duration: "4 weeks" 
        }
      ],
      project: "Build a real-world system with actual users. Handle traffic, solve production problems, and write a teardown.",
      skip: ["Breadth over depth", "Clean code on unused systems", "Certification collection"]
    }
  ],
  checkpoints: [
    "You can design a system that handles 10x current load without rewriting it",
    "Junior devs come to you with problems you've already solved — and documented",
    "You know which corners to cut and which never to cut",
    "You've debugged something nobody else could find — and wrote a postmortem",
    "You have opinions on trade-offs and can defend the other side too"
  ]
};
