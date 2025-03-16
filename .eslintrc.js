module.exports = {
    "rules": {
      "no-unused-vars": "warn", // 未使用の変数を警告
      "import/no-unused-modules": [1, { unusedExports: true }] // 未使用のモジュールを検出
    }
  };