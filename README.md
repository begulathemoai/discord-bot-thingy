# Bot qui permet de chat en vif

Pour que ça marche il faut dans ce dossier un fichier `config.json` de ce format :

```
{
	"token": "TOKEN-DU-BOT-DISCORD",
	"clientId": "ID-DU-BOT-DISCORD",
	"guildId": "ID-DU-SERV-DU-BOT"
}
```

oui btw c'est un bot en single serv parce que je suis une merde donc pour l'instant il ne peut être que dans un seul serv

le bot a besoin des perms "bot" et "application.command" ou un truc comme ça
et les 3 intents disponibles
c'est codé avec les pieds donc ouais y'a pas du tout d'error checking on fait confiance à l'utilisateur :)

pour obtenir les dépendances faut faire `npm install`
oui btw j'ai oublié de mentionner que le bot utilise node.js ?
donc faut ça d'installé et si possible dans le PATH
