export interface Library {
  id: string;
  name: string;
  category: 
    | 'Linter/Formatter' 
    | 'CLI Tools' 
    | 'UI/Output' 
    | 'Utils' 
    | 'Data/Perf' 
    | 'Networking' 
    | 'AI/ML' 
    | 'Testing' 
    | 'Cloud/IaC'
    | 'Observability/Security'
    | 'DB/ORM'
    | 'Task/Queue'
    | 'Profiling/DevTools';
  description?: string;
  status: 'preferred' | 'legacy' | 'essential';
  repo?: string;
}

export const libraries: Library[] = [
  // Linter & Formatter
  {
    id: 'ruff',
    name: 'Ruff',
    category: 'Linter/Formatter',
    status: 'preferred',
    repo: 'astral-sh/ruff'
  },
  {
    id: 'pyright',
    name: 'Pyright',
    category: 'Linter/Formatter',
    status: 'essential',
    repo: 'microsoft/pyright'
  },
  {
    id: 'vulture',
    name: 'Vulture',
    category: 'Linter/Formatter',
    status: 'essential',
    repo: 'jendrikseipp/vulture'
  },
  {
    id: 'mypy',
    name: 'mypy',
    category: 'Linter/Formatter',
    status: 'legacy',
    repo: 'python/mypy'
  },

  // CLI Tools
  {
    id: 'typer',
    name: 'Typer',
    category: 'CLI Tools',
    status: 'preferred',
    repo: 'fastapi/typer'
  },
  {
    id: 'beaupy',
    name: 'Beaupy',
    category: 'CLI Tools',
    status: 'preferred',
    repo: 'petereon/beaupy'
  },
  {
    id: 'textual',
    name: 'Textual',
    category: 'CLI Tools',
    status: 'preferred',
    repo: 'textualize/textual'
  },

  // UI & Output
  {
    id: 'rich',
    name: 'Rich',
    category: 'UI/Output',
    status: 'preferred',
    repo: 'textualize/rich'
  },
  {
    id: 'nicegui',
    name: 'NiceGUI',
    category: 'UI/Output',
    status: 'preferred',
    repo: 'zauberzeug/nicegui'
  },
  {
    id: 'reflex',
    name: 'Reflex',
    category: 'UI/Output',
    status: 'preferred',
    repo: 'reflex-dev/reflex'
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'UI/Output',
    status: 'essential',
    repo: 'streamlit/streamlit'
  },

  // Networking
  {
    id: 'litestar',
    name: 'Litestar',
    category: 'Networking',
    status: 'preferred',
    repo: 'litestar-org/litestar'
  },
  {
    id: 'sanic',
    name: 'Sanic',
    category: 'Networking',
    status: 'preferred',
    repo: 'sanic-org/sanic'
  },
  {
    id: 'robyn',
    name: 'Robyn',
    category: 'Networking',
    status: 'preferred',
    repo: 'sansyrox/robyn'
  },
  {
    id: 'granian',
    name: 'Granian',
    category: 'Networking',
    status: 'preferred',
    repo: 'emmett-framework/granian'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Networking',
    status: 'essential',
    repo: 'tiangolo/fastapi'
  },
  {
    id: 'curl_cffi',
    name: 'curl_cffi',
    category: 'Networking',
    status: 'essential',
    repo: 'lexiforest/curl_cffi'
  },
  {
    id: 'httpx',
    name: 'HTTPX',
    category: 'Networking',
    status: 'essential',
    repo: 'encode/httpx'
  },

  // DB & ORM
  {
    id: 'sqlmodel',
    name: 'SQLModel',
    category: 'DB/ORM',
    status: 'preferred',
    repo: 'tiangolo/sqlmodel'
  },
  {
    id: 'tortoise',
    name: 'Tortoise ORM',
    category: 'DB/ORM',
    status: 'preferred',
    repo: 'tortoise/tortoise-orm'
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'DB/ORM',
    status: 'essential',
    repo: 'sqlalchemy/sqlalchemy'
  },
  {
    id: 'peewee',
    name: 'Peewee',
    category: 'DB/ORM',
    status: 'legacy',
    repo: 'coleifer/peewee'
  },

  // Task & Queue
  {
    id: 'taskiq',
    name: 'Taskiq',
    category: 'Task/Queue',
    status: 'preferred',
    repo: 'taskiq-python/taskiq'
  },
  {
    id: 'arq',
    name: 'Arq',
    category: 'Task/Queue',
    status: 'preferred',
    repo: 'samuelcolvin/arq'
  },
  {
    id: 'dramatiq',
    name: 'Dramatiq',
    category: 'Task/Queue',
    status: 'preferred',
    repo: 'Bogdanp/dramatiq'
  },
  {
    id: 'celery',
    name: 'Celery',
    category: 'Task/Queue',
    status: 'essential',
    repo: 'celery/celery'
  },

  // Data & Performance
  {
    id: 'polars',
    name: 'Polars',
    category: 'Data/Perf',
    status: 'preferred',
    repo: 'pola-rs/polars'
  },
  {
    id: 'duckdb',
    name: 'DuckDB',
    category: 'Data/Perf',
    status: 'preferred',
    repo: 'duckdb/duckdb'
  },
  {
    id: 'modin',
    name: 'Modin',
    category: 'Data/Perf',
    status: 'preferred',
    repo: 'modin-project/modin'
  },
  {
    id: 'ray',
    name: 'Ray',
    category: 'Data/Perf',
    status: 'preferred',
    repo: 'ray-project/ray'
  },
  {
    id: 'pydantic',
    name: 'Pydantic',
    category: 'Data/Perf',
    status: 'essential',
    repo: 'pydantic/pydantic'
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data/Perf',
    status: 'essential',
    repo: 'numpy/numpy'
  },

  // AI & Machine Learning
  {
    id: 'smolagents',
    name: 'Smolagents',
    category: 'AI/ML',
    status: 'preferred',
    repo: 'huggingface/smolagents'
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    category: 'AI/ML',
    status: 'preferred',
    repo: 'microsoft/autogen'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'AI/ML',
    status: 'essential',
    repo: 'langchain-ai/langchain'
  },

  // Testing
  {
    id: 'pytest',
    name: 'pytest',
    category: 'Testing',
    status: 'preferred',
    repo: 'pytest-dev/pytest'
  },
  {
    id: 'hypothesis',
    name: 'Hypothesis',
    category: 'Testing',
    status: 'preferred',
    repo: 'HypothesisWorks/hypothesis'
  },
  {
    id: 'playwright',
    name: 'Playwright',
    category: 'Testing',
    status: 'essential',
    repo: 'microsoft/playwright-python'
  },

  // Cloud & IaC
  {
    id: 'pulumi',
    name: 'Pulumi',
    category: 'Cloud/IaC',
    status: 'preferred',
    repo: 'pulumi/pulumi-python'
  },
  {
    id: 'boto3',
    name: 'Boto3',
    category: 'Cloud/IaC',
    status: 'essential',
    repo: 'boto/boto3'
  },

  // Profiling & DevTools
  {
    id: 'scalene',
    name: 'Scalene',
    category: 'Profiling/DevTools',
    status: 'preferred',
    repo: 'plasma-umass/scalene'
  },
  {
    id: 'memray',
    name: 'Memray',
    category: 'Profiling/DevTools',
    status: 'preferred',
    repo: 'bloomberg/memray'
  },
  {
    id: 'py-spy',
    name: 'py-spy',
    category: 'Profiling/DevTools',
    status: 'preferred',
    repo: 'benfred/py-spy'
  },
  {
    id: 'viztracer',
    name: 'VizTracer',
    category: 'Profiling/DevTools',
    status: 'preferred',
    repo: 'gaogaotiantian/viztracer'
  },

  // Observability & Security
  {
    id: 'loguru',
    name: 'Loguru',
    category: 'Observability/Security',
    status: 'preferred',
    repo: 'Delgan/loguru'
  },
  {
    id: 'logfire',
    name: 'Logfire',
    category: 'Observability/Security',
    status: 'preferred',
    repo: 'pydantic/logfire'
  },
  {
    id: 'hvac',
    name: 'hvac',
    category: 'Observability/Security',
    status: 'essential',
    repo: 'hvac/hvac'
  },

  // Utils
  {
    id: 'uv',
    name: 'uv',
    category: 'Utils',
    status: 'preferred',
    repo: 'astral-sh/uv'
  },
  {
    id: 'scrapling',
    name: 'Scrapling',
    category: 'Utils',
    status: 'preferred',
    repo: 'D4Vinci/Scrapling'
  },
  {
    id: 'markitdown',
    name: 'MarkItDown',
    category: 'Utils',
    status: 'essential',
    repo: 'microsoft/markitdown'
  },
  {
    id: 'dotenv',
    name: 'python-dotenv',
    category: 'Utils',
    status: 'essential',
    repo: 'theskumar/python-dotenv'
  }
];
