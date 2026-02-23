export interface Library {
  id: string;
  name: string;
  category: 'Linter/Formatter' | 'CLI Tools' | 'UI/Output' | 'Utils' | 'Data/Perf' | 'Networking';
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

  // UI & Output
  {
    id: 'rich',
    name: 'Rich',
    category: 'UI/Output',

    status: 'preferred',
    repo: 'textualize/rich'
  },
  {
    id: 'loguru',
    name: 'Loguru',
    category: 'UI/Output',

    status: 'preferred',
    repo: 'Delgan/loguru'
  },
  {
    id: 'textual',
    name: 'Textual',
    category: 'UI/Output',

    status: 'preferred',
    repo: 'textualize/textual'
  },

  // Networking
  {
    id: 'granian',
    name: 'Granian',
    category: 'Networking',

    status: 'preferred',
    repo: 'emmett-framework/granian'
  },
  {
    id: 'robyn',
    name: 'Robyn',
    repo: 'sansyrox/robyn',
    category: 'Networking',

    status: 'preferred'
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

  // Data & Performance
  {
    id: 'polars',
    name: 'Polars',
    category: 'Data/Perf',

    status: 'preferred',
    repo: 'pola-rs/polars'
  },
  {
    id: 'msgspec',
    name: 'msgspec',
    category: 'Data/Perf',

    status: 'preferred',
    repo: 'jcrist/msgspec'
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

  // Utils
  {
    id: 'uv',
    name: 'uv',
    category: 'Utils',

    status: 'preferred',
    repo: 'astral-sh/uv'
  },
  {
    id: 'dynaconf',
    name: 'Dynaconf',
    category: 'Utils',

    status: 'preferred',
    repo: 'dynaconf/dynaconf'
  },
  {
    id: 'scrapling',
    name: 'Scrapling',
    category: 'Utils',

    status: 'preferred',
    repo: 'D4Vinci/Scrapling'
  },
  {
    id: 'nuitka',
    name: 'Nuitka',
    repo: 'Nuitka/Nuitka',
    category: 'Utils',

    status: 'preferred'
  },
  {
    id: 'markitdown',
    name: 'MarkItDown',
    category: 'Utils',

    status: 'essential',
    repo: 'microsoft/markitdown'
  }
];
