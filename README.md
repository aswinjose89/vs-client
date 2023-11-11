<p align="center">
  <a href="https://github.com/ng-matero">
    <img width="150" src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/244879/459522_878566.png">
  </a>
</p>

<h1 align="center">
CyberNeuroRT - Client
</h1>


## ✨ Features

- Live Traffic
- Dashboard
- Traffic Aggregation
- Search-Analysis-Hunt
- Dark Web

## 📦 Compatibility

Which version to use?

| Angular | Material | Extensions |
| ------- | -------- | ---------- |
| v11     | v11      | 11.x.x     |
| v10     | v10      | 10.14.0    |
| v9      | v9       | 9.11.13    |
| v8      | v8       | 0.9.3      |

## 🔧 Installation

You can also git clone the starter repo to start. But it's not recommended.

```bash
$ git clone --depth=1 git@github.com:Globalhelpforall/nids_client.git
$ cd <project-name>
$ npm install
```

## 🔧 Docker Image
```sh
  docker run --rm -it -p 8084:80 quantumventura/nids-client:latest
```

## 📦 Git Commands
```sh
  git clone --recursive git@github.com:Globalhelpforall/nids_client.git
  cd nids/nids_client
  git checkout master
```
Make sure you have done ssh setup done already otherwise follow below steps

(1) on computer you push/pull from run this command:
ssh-keygen -t ed25519 -C "your_email@example.com”

(2) copy contents of ~/.ssh/id_ed25519.pub to clipboard

(3) login to github and go to: 
https://github.com/settings/keys
(Accessed via profile menu -> settings -> ssh and gpg keys

(4) Click “new ssh key” and fill in title as you please. Paste the copied text into “key” text box. Done.

(5) When cloning, use the “ssh” url not “https”. If updating existing repo, change the remote url to push and pull from the “ssh” url under the clone button (can be done with “git remote set-url origin [ssh url]”

## 📖 References
https://pumpingco.de/blog/environment-variables-angular-docker/


## 📃 License

MIT
