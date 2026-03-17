# Python with AI & Machine Learning Course

A comprehensive, hands-on course covering Python programming, data science, machine learning, deep learning, computer vision, NLP, and LLM application development with LangChain. Includes Google Colab notebooks, PPTX slide decks, and DOCX lab guides.

## Course Modules

| Module | Topic | Notebooks |
|--------|-------|-----------|
| 01 | Python Fundamentals | Variables, control flow, functions, debugging, file I/O |
| 02 | Data Structures & OOP | Lists, tuples, dicts, sets, arrays, trees, classes, inheritance |
| 03 | Data Science: NumPy & Pandas | Array operations, DataFrames, data manipulation, aggregation |
| 04 | Data Visualization | Matplotlib, Seaborn, Plotly, chart types, styling |
| 05 | Exploratory Data Analysis | Statistical summaries, distributions, feature engineering, Titanic EDA |
| 06 | Machine Learning | Linear regression, decision trees, hyperparameter tuning, cross-validation |
| 07 | Advanced Machine Learning | Ensemble methods, bagging, boosting, clustering, case studies |
| 08 | Neural Networks | Perceptrons, activation functions, backpropagation, Keras/TensorFlow |
| 09 | Computer Vision & CNNs | Convolutional networks, image classification, transfer learning, YOLO |
| 10 | Natural Language Processing | Text preprocessing, TF-IDF, sentiment analysis, word embeddings |
| 11 | Quizzes & Practice | Coding challenges, weekly quizzes, HackerRank practice |
| 12 | LangChain & LLMs | Prompt templates, chains, in-context learning, AI app development |

## Course Structure

```
google-colab-notebooks-AI-ML/
├── README.md
├── slides/                              # PPTX slide decks per module
│   ├── 01-python-fundamentals.pptx
│   ├── 02-data-structures-oop.pptx
│   ├── ...
│   └── 12-langchain-llms.pptx
├── labs/                                # DOCX hands-on lab guides
│   ├── lab-01-python-fundamentals.docx
│   ├── lab-02-data-structures-oop.docx
│   ├── ...
│   └── lab-12-langchain-llms.docx
├── 01-Python-Fundamentals/              # Jupyter notebooks
├── 02-Data-Structures-and-OOP/
├── 03-Data-Science-NumPy-Pandas/
├── 04-Data-Visualization/
├── 05-Exploratory-Data-Analysis/
├── 06-Machine-Learning/
├── 07-Advanced-Machine-Learning/
├── 08-Neural-Networks/
├── 09-Computer-Vision-CNN/
├── 10-NLP/
├── 11-Quizzes-and-Practice/
└── 12-LangChain/
```

## Prerequisites

- A computer with at least 8 GB RAM (16 GB recommended for deep learning modules)
- Internet connection (for Google Colab and package downloads)
- Basic familiarity with the command line

---

## Environment Setup

You can run the notebooks in **Google Colab** (no local install needed) or set up a **local Python environment**. Both approaches are covered below.

### Option A: Google Colab (Recommended for Beginners)

Google Colab provides a free, cloud-based Jupyter environment with GPU access — no installation required.

**1. Open a notebook in Colab**

- Go to https://colab.research.google.com
- Click **File > Open notebook > GitHub**
- Paste this repository URL or upload `.ipynb` files directly
- Alternatively, click the "Open in Colab" badge on any notebook

**2. Enable GPU (for deep learning modules 08-10)**

- Click **Runtime > Change runtime type**
- Set **Hardware accelerator** to **T4 GPU**
- Click **Save**

**3. Install additional packages (if needed)**

Colab comes with most data science packages pre-installed. For extra packages, add a cell at the top:

```python
!pip install langchain openai chromadb tiktoken
```

**4. Mount Google Drive (to save work)**

```python
from google.colab import drive
drive.mount('/content/drive')
```

---

### Option B: Local Python Environment

#### Python Installation

##### macOS

**Using Homebrew (recommended):**

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3.12
brew install python@3.12

# Verify
python3 --version
pip3 --version
```

**Using the official installer:**

Download from https://www.python.org/downloads/macos/ and run the `.pkg` installer.

##### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install Python 3.12 and pip
sudo apt install -y python3.12 python3.12-venv python3-pip

# If Python 3.12 is not in default repos, use deadsnakes PPA
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3.12-dev

# Verify
python3.12 --version
```

##### Windows

**Option 1: Official installer (recommended)**

1. Download Python 3.12 from https://www.python.org/downloads/windows/
2. Run the installer
3. **IMPORTANT**: Check "Add Python to PATH" during installation
4. Click "Install Now"

Verify in PowerShell:

```powershell
python --version
pip --version
```

**Option 2: Using Chocolatey**

```powershell
# Install Chocolatey (if not already installed)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Python
choco install python --version=3.12.0

# Verify
python --version
```

**Option 3: WSL 2 (recommended for ML/DL)**

```powershell
# Install WSL 2
wsl --install -d Ubuntu-22.04
```

Then follow the Linux instructions inside your WSL terminal.

---

#### Virtual Environment Setup

Always use a virtual environment to isolate project dependencies.

##### Using venv (built-in)

```bash
# Create virtual environment
python3 -m venv .venv

# Activate it
# macOS/Linux:
source .venv/bin/activate
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
# Windows CMD:
.\.venv\Scripts\activate.bat

# Verify
which python    # Should point to .venv/bin/python
pip --version   # Should point to .venv

# Deactivate when done
deactivate
```

##### Using Conda (recommended for ML/DL)

```bash
# Install Miniconda
# macOS (Apple Silicon)
curl -LO https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh
bash Miniconda3-latest-MacOSX-arm64.sh

# macOS (Intel)
curl -LO https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh

# Linux
curl -LO https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Windows: Download installer from https://docs.conda.io/en/latest/miniconda.html

# Create environment
conda create -n aiml python=3.12 -y
conda activate aiml

# Deactivate when done
conda deactivate
```

---

#### Installing Dependencies

```bash
# Activate your virtual environment first, then:

# Core data science stack (Modules 01-07)
pip install numpy pandas matplotlib seaborn scikit-learn jupyter notebook

# Deep learning (Modules 08-09)
pip install tensorflow keras

# NLP (Module 10)
pip install nltk spacy transformers
python -m spacy download en_core_web_sm
python -m nltk.downloader popular

# LangChain & LLMs (Module 12)
pip install langchain langchain-community openai chromadb tiktoken

# Computer Vision extras (Module 09)
pip install opencv-python Pillow

# Or install everything at once
pip install numpy pandas matplotlib seaborn scikit-learn jupyter notebook \
    tensorflow keras nltk spacy transformers \
    langchain langchain-community openai chromadb tiktoken \
    opencv-python Pillow
```

---

#### Jupyter Notebook Setup

```bash
# Install Jupyter (if not already installed)
pip install jupyter notebook

# Start Jupyter Notebook
jupyter notebook

# Or start JupyterLab (more modern interface)
pip install jupyterlab
jupyter lab
```

This will open your browser at http://localhost:8888. Navigate to the module folder and open any `.ipynb` file.

**VS Code alternative:**

1. Install the "Jupyter" extension in VS Code
2. Open any `.ipynb` file
3. Select your Python interpreter (`.venv` or conda environment)
4. Run cells with Shift+Enter

---

## GPU Setup (for Deep Learning Modules)

Modules 08-10 benefit from GPU acceleration. Google Colab provides free GPU access. For local GPU setup:

### NVIDIA GPU (CUDA)

```bash
# Check if NVIDIA GPU is detected
nvidia-smi

# Install CUDA toolkit (if not already installed)
# Follow: https://developer.nvidia.com/cuda-downloads

# TensorFlow with GPU support
pip install tensorflow[and-cuda]

# Verify GPU is available
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

### Apple Silicon (M1/M2/M3/M4)

TensorFlow supports Apple Silicon natively via Metal:

```bash
pip install tensorflow-macos tensorflow-metal

# Verify
python -c "import tensorflow as tf; print(tf.config.list_physical_devices())"
```

---

## Module Progression

### Beginner (Modules 01-05)
Start here if you're new to Python or data science. These modules build foundational skills.

1. **Python Fundamentals** — Variables, loops, functions, file handling
2. **Data Structures & OOP** — Lists, dicts, classes, inheritance
3. **NumPy & Pandas** — Numerical computing, DataFrames, data wrangling
4. **Data Visualization** — Charts, plots, storytelling with data
5. **EDA** — Statistical analysis, feature engineering, real datasets

### Intermediate (Modules 06-07)
Move here once you're comfortable with Python and Pandas.

6. **Machine Learning** — Regression, classification, model evaluation
7. **Advanced ML** — Ensemble methods, clustering, end-to-end projects

### Advanced (Modules 08-12)
Deep learning, computer vision, NLP, and cutting-edge LLM applications.

8. **Neural Networks** — Architecture, training, Keras/TensorFlow
9. **Computer Vision** — CNNs, image classification, YOLO object detection
10. **NLP** — Text processing, sentiment analysis, transformers
11. **Practice** — Quizzes and coding challenges across all topics
12. **LangChain** — Building AI applications with large language models

---

## Quick Reference: Common Commands

```bash
# Environment
python3 -m venv .venv && source .venv/bin/activate   # Create & activate venv
pip install -r requirements.txt                       # Install from requirements
pip freeze > requirements.txt                         # Save current packages

# Jupyter
jupyter notebook                                      # Start notebook server
jupyter lab                                           # Start JupyterLab

# Package management
pip install <package>                                 # Install a package
pip install --upgrade <package>                       # Upgrade a package
pip list                                              # List installed packages
conda install <package>                               # Install via conda
conda env export > environment.yml                    # Export conda env

# GPU verification
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
python -c "import torch; print(torch.cuda.is_available())"
```

---

## Troubleshooting

### "ModuleNotFoundError: No module named 'xyz'"
```bash
pip install xyz
# Make sure your virtual environment is activated
```

### Jupyter kernel doesn't see installed packages
```bash
# Install ipykernel in your venv
pip install ipykernel
python -m ipykernel install --user --name=aiml --display-name="Python (AI/ML)"
# Then select this kernel in Jupyter
```

### TensorFlow not detecting GPU
```bash
# Check CUDA version compatibility
nvidia-smi                    # Shows CUDA driver version
python -c "import tensorflow as tf; print(tf.__version__)"
# See: https://www.tensorflow.org/install/source#gpu for version matrix
```

### Permission errors on Linux
```bash
pip install --user <package>
# Or use a virtual environment (recommended)
```

---

## License

This course material is provided for educational purposes. All referenced libraries and frameworks are property of their respective owners.
