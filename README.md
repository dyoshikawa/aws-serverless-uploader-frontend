# デモサイト

[AWS Serverless Uploader](https://aws-serverless-uploader.netlify.com/)

# 概要

- 言語は Go。AWS Lambda APIGateway DynamoDB S3 を用いたサーバレスアプリケーション
- IAM の権限概念を理解しながら実装
- DynamoDB や S3 へのアクセスを interface で抽象化
- Localstack を用いた自動テスト環境の整備
- フロントエンドは React + TypeScript + Netlify

# フロントエンド

[aws-serverless-uploader-frontend](https://github.com/dyoshikawa/aws-serverless-uploader-frontend)

# セットアップ

## 環境

- Go 1.11.2
- dep
- Node 8.11.0
- npm or yarn
- aws-cli
- direnv

## 起動

```
git clone https://github.com/dyoshikawa/aws-serverless-uploader-frontend
cd aws-serverless-uploader-frontend
cp src/env.dev.ts src/env.ts
yarn
yarn start --open
```
