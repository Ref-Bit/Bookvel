<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href={{ config('app.env') === 'local' ? asset('css/app.css') : asset('css/app.css', true) }}>
        <title>BookVel</title>
    </head>
    <body>
      <div id="app"></div>
      <script src={{ config('app.env') === 'local' ? asset('js/app.js') : asset('js/app.js', true) }}></script>
    </body>
</html>
