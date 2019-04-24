client_scripts {
    '@wtf_redis/lib/redis.lua',

    'lib/api.lua', -- 3rd party API

    'lib/db.lua',
    'lib/lib.lua',
    'lib/internal.lua',
    'client/client.lua',
}

server_scripts {
    'server/server.lua',
}

ui_page 'ui-build/index.html'

files {
    'ui-build/main.chunk.js',
    'ui-build/bundle.js',
    'ui-build/2.chunk.js',
    'ui-build/index.html',
}