# reporting system

Report creation system for water-related problems, such as leaks, contamination, among others.


### Key Features

1. **Polls Management**
   - **Add Poll:** Users can add new Polls with details like question, start date and end time.
   - **Update Poll:** Only the creator can update a Poll's details.
   - **Delete Poll:** Individial polls can be deleted by the creator.

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

## Interaction with the canister

When a canister is deployed, `dfx deploy` produces a link to the Candid interface in the shell output.

Candid interface provides a simple UI where you can interact with functions in the canister.

On the other hand, you can interact with the canister using `dfx` via CLI:

### get canister id:
- `dfx canister id <CANISTER_NAME>`
Example:
- `dfx canister id icp_azle_learning_platform`
Response:
```
bkyz2-fmaaa-aaaaa-qaaaq-cai
```

Now, the URL of your canister should like this:
```
http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000
```

With this URL, you can interact with the canister using an HTTP client of your choice. We are going to use `curl`.

## Usage

### Get Polls
```
curl http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/polls
```

### Create Poll
```
curl -X POST http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/polls -H "Content-type: application/json" -d '{
    "question": "What is your favorite programming language",
    "creatorName": "carlos Sosa",
    "startDate": "2024-04-04",
    "endDate": "2024-05-04"
}'
```

### Vote on a Poll given a poll id
```
curl -X POST http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/polls/50116dad-c203-4259-9175-043fce881ccd/vote -H "Content-type: application/json" -d '{
    "choice": "JavaScript"
}'
```
