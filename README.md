# reply-bot-zyyx

Lấy Bot User OAuth Token: https://api.slack.com/apps/A037AUEP1FA/install-on-team?
Lấy Signing Secret: https://api.slack.com/apps/A037AUEP1FA

Enable Soket Mode: https://app.slack.com/app-settings/T0347AM5UB1/A037AUEP1FA/socket-mode
Lấy App Token: https://api.slack.com/apps/A037AUEP1FA/general

Bật sever:
Connect account: ngrok authtoken 26ERWYUaDpg93G3pTwkEYKRtKnF_4BJZ4yokY49UwViVXVt6Q
ngrok http 3000
thay đổi link mỗi khi bật lại sever

set nodeJS version cao nhất: nvm use stable
deploy: yarn run dev

event messages: https://slack.dev/bolt-js/concepts#event-listening


log heroku: heroku logs --tail --app bot-line-zyyx
https://dashboard.heroku.com/apps/bot-line-zyyx/deploy/github
lấy ip tĩnh: https://www.cman.jp/network/support/go_access.cgi
