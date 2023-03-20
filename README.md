# Laravel + Vue

**Download this project and run this command**
```javascript
composer install
npm install
```
npm install sass-loader node-sass webpack --save-dev

**Create database the name call VueLaravel**
```javascript
php artisan migrate
```

**Finally run this command**
```javascript
npm run watch
php artisan serve
```



# Setup Manually

**Create New Project**

```javascript
 laravel new ProjectName
```

**Install Laravel/Ui & UI Vue**

```javascript
composer require laravel/ui
php artisan ui vue
```

**Install Vue 3**

```javascript
npm install vue@next vue-loader@next
```

**Install Axios**

```javascript
npm i axios
```

**Install Vue Router 3**

```javascript
npm install vue-router
```

**In your rotuer.js**

```javascript
import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        name: "Home",
        component: require('./Home.vue').default
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: require('./components/PageNotFound.vue').default
    }];

const router = createRouter({
    history: createWebHistory(process.env.BASH_URL),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active"
});

export default router;
```

**Insert this code to your resources/views/home.blade.php**

```html
<div id="app"></div>

<script src="{{ mix('/js/app.js') }}"></script>
```

**Install FontAwesome**
```javascript
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/vue-fontawesome@latest-3

```

**And then Install NPM Dependencies**

```javascript
npm install 
npm run dev
npm run watch
```

**Instal Vue Ckeditor-5**
```javascript
npm install --save @ckeditor/ckeditor5-vue @ckeditor/ckeditor5-build-classic
```

```javascript

Vue.createApp( { /* options */ } ).use( CKEditor ).mount( /* DOM element */ );

<ckeditor tag-name="textarea" id="editor" aria-placeholder="Body" :editor="editor" v-model="forms.body" :config="editorConfig"></ckeditor>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

data(){
    return{
        editor: ClassicEditor,
        editorConfig: {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote','|', 'undo', 'redo', ],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading2', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 4', class: 'ck-heading_heading5' }
                ]
            }
        }
    }
}
</script>

```


**Run PHP Artisan serve**

```javascript
php aritsan serve
```

**Install Sanctum**
```javascript
composer require laravel/sanctum
```

Next, you should publish the Sanctum configuration and migration files using the vendor:publish Artisan command. The sanctum configuration file will be placed in your application's config directory:

```javascript
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Finally, you should run your database migrations. Sanctum will create one database table in which to store API tokens:

```javascript
php artisan migrate
```

Next, if you plan to utilize Sanctum to authenticate a SPA, you should add Sanctum's middleware to your api middleware group within your application's app/Http/Kernel.php file:

```javascript
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

**Create Token**
```javascript
$user->createToken('auth')->plainTextToken;
```

**Revoking Tokens**
You may "revoke" tokens by deleting them from your database using the tokens relationship that is provided by the Laravel\Sanctum\HasApiTokens trait:

```javascript
// Revoke all tokens...
$user->tokens()->delete();
 
// Revoke the token that was used to authenticate the current request...
$request->user()->currentAccessToken()->delete();
 
// Revoke a specific token...
$user->tokens()->where('id', $tokenId)->delete();
```
 