.PHONY: help
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: token
token: twitch tokens.json ## Récupère un token d'accès à insérer dans le fichier tokens.json
	./twitch token -u -s channel:read:redemptions

twitch:
	wget https://github.com/twitchdev/twitch-cli/releases/download/v1.1.6/twitch-cli_1.1.6_Linux_x86_64.tar.gz
	tar -xf twitch-cli_1.1.6_Linux_x86_64.tar.gz twitch-cli_1.1.6_Linux_x86_64/twitch
	rm twitch-cli_1.1.6_Linux_x86_64.tar.gz
	mv twitch-cli_1.1.6_Linux_x86_64/twitch twitch
	rmdir twitch-cli_1.1.6_Linux_x86_64
	chmod +x twitch

tokens.json:
	cp tokens.example.json tokens.json
