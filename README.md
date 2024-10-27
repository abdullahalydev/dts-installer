<h1 align="center">
    dts-installer
</h1>
<p align="center">Install packages with their types easily and simply</p>

<h2>Description</h2>
<p>
dts-installer is <strong>a tool cli based</strong>, that you can install any packages with his types
</p>

<h2>Features</h2>
<ul>
    <li>install packages 😮🎉</li>
    <li>uninstall packages 🥳🏗️</li>
    <li>scan already installed packages 💻💿</li>
</ul>

<h2>Installation</h2>

```shell
npm install --global dts-installer
```

<h2>Usage</h2>
<p>After downloading the package from npm, you can use it from the command line</p>

```shell
> dts-installer install jsonbyte express mongoose 
>
> [ ✅ ][ jsonbyte ] - package installed (no-types)
> [ ✅ ][ express ] - package installed (external-types) 
> [ ✅ ][ mongoose ] - package installed (includes-types)
```
```diff
{
  "dependencies": {
+    "express": "^4.21.1",
+    "jsonbyte": "^1.1.7",
+    "mongoose": "^8.7.3",
  },
  "devDependencies": {
+    "@types/express": "^5.0.0",
  }
}

```

<h2>Contributing</h2>
<p>
Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a <a href="https://github.com/AbdullahalyDev/redirect-detector/pulls">pull request</a>.
</p>

<h2>License</h2>
<p>
This application is licensed under the MIT License. See the LICENSE file for more information.
</p>
