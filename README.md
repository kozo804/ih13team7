# HalMotors Team7

## ディレクトリ構成
```
HalMotors
│
├ backend
│    ├ bin ────────── www nodeで最初に起動するファイル
│    ├ models ─────── データベース関係 スキーマなど
│    ├ public ─────── css jsなど
│    ├ routes ─────── ルーター パスに沿ってレスポンス処理をする
│    ├ views ──────── 削除予定
│    ├ app.js ─────── expressの初期設定やルーターの定義、エラーハンドリングなどの処理
│    │                bin/wwwで読み込んでいる
│    └ package.json
│
│
└ frontend
     ├ bin ────────── www nodeで最初に起動するファイル
     ├ public
     ├    ├ views ─── htmlとテンプレート
     ├    ├ js
     ├    ├ images
     ├    └ css
     ├ routes ─────── ルーター パスに沿ってレスポンス処理をする
     ├ app.js ─────── expressの初期設定やルーターの定義、エラーハンドリングなどの処理
     │                bin/wwwで読み込んでいる
     └ package.json
```
