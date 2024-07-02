# reporting system

Report creation system for water-related problems, such as leaks, contamination, among others.

FrontEnd: https://github.com/ama13do/FlowFinder
BackEnd: https://github.com/whoAngeel/icp-rest-api
video prototipo: https://drive.google.com/file/d/1Y9yj1sGuWDnbHeGGfjcKbwfEeTcSGwl5/view?usp=sharing 
link del documento: https://drive.google.com/file/d/14siaPUTQCftX4kYSjLGQQ1kRSm6ddyTr/view?usp=sharing


## Prerequisities

1. Install `nvm`:
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

2. Switch to node v20:
- `nvm install 20`
- `nvm use 20`

3. Install build dependencies:
## For Ubuntu and WSL2
```
sudo apt-get install podman
```
## For macOS:
```
xcode-select --install
brew install podman
```

4. Install `dfx`
- `DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"`

5. Add `dfx` to PATH:
- `echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"`

7. Run a local replica
- `dfx start --host 127.0.0.1:8000 --background --clean`

8. Deploy a canister
- `dfx deploy`
Also, if you are building an HTTP-based canister and would like your canister to autoreload on file changes (DO NOT deploy to mainnet with autoreload enabled):
```
AZLE_AUTORELOAD=true dfx deploy
```

9. Stop a local replica
- `dfx stop`



