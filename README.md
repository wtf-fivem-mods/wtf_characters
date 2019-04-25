# wtf_characters

Early stage character creation / selection resource for FiveM.

![ui-example](https://user-images.githubusercontent.com/79330/56710379-c6757180-66da-11e9-8c9c-0ca4ddc2e0e9.gif)

# API

wtf_characters provides the UI and API for managing character selection. Your resource can use the API to get the currently selected character for a given player.

In your `__resource.lua`:

```lua

client_scripts {
    '@wtf_characters/lib/api.lua', -- be sure to include this before your scripts

    'client.lua',
}

server_scripts {
      'server.lua',
}

dependencies {
    'wtf_characters',
}

```

The API is all client side you don't need to manage callbacks or notifications between client and server scripts. The following functions can be used from within your client side lua:

```lua

--- WTF.GetCharacter returns the current player's character
-- This function may return nil if the player hasn't yet selected
-- their character to play. You can use this in your script after
-- you're sure they've entered the game. Use WTF.WaitForCharacter()
-- in your resource's startup code.
--
-- This function is performant and can be included in game loops.
--
-- NOTE: don't hold on to a reference of this variable, if a player
-- changes their character you'll be holding on to old data.
WTF.GetCharacter()

--- WTF.WaitForCharacter()
-- This function returns the player's current character. The function
-- will wait to return until the player selects their character.
--
-- This is useful in the startup stage of your resource. You can call
-- this function and the code below will execute after the character is
-- selected.
--
-- NOTE: this must be called within a Citizen.CreateThread(function() ... end)
-- Calling this function outside of any thread will result in an error.
WTF.WaitForCharacter()

--- Character object
-- The character returned from the API has the following structure:
{
  idx, -- used internally, ignore and definitely don't change
  uid, -- a unique id based on steamid and idx, use this to persist data related to this character
  firstName,
  lastName,
}

--- Example
-- This is an example client side lua:

Citizen.CreateThread(function()
    local character = WTF.WaitForCharacter()
    -- the script waits on the above line until character is selected
    print('Character IDX: '..tostring(character.idx))
    print('Character UID: '..tostring(character.uid))
    print('Character firstName: '..tostring(character.firstName))
    print('Character lastName: '..tostring(character.lastName))
    
    -- ... later on during the life of your resource
    
    while true do
        Citizen.Wait(1)
        local character = WTF.GetCharacter() -- returns instantly
        -- e.g. render something
    end
    
    -- You can always call WTF.WaitForCharacter() if you're unsure if
    -- the character is available. It will return instantly if it is.
end)
```

# Dependencies

- Redis / [wtf_redis]
    - By default, wtf_characters, uses Redis and expects it to be running on the game server. See [wtf_redis] for
    more info.
    - The code was written to support additional backends (i.e. ESX), feel free to contribute if you'd like.
    
# Download, Building and Installation

wtf_characters doesn't currently have a release. If you'd like to use it in its early stage you'll have to build it.

## Requirements

- UI requirements
  - Node v8.15.1 (you can use a later version, but this was used for best compatability with FiveM)
  - yarn v1.15.2 (package manager, alternative to NPM, but you can use NPM if you'd like)

    ```shell
    # if you don't have yarn installed
    $ npm install -g yarn
    
    # from your resources folder
    $ cd "[wtf]/wtf_characters/ui-src"
    
    # install deps
    $ yarn
    
    # build
    $ yarn build
    ```

- Redis
  - http://redis.io to download server
  - No configuration necessary

## Getting the code
```
cd resources
git clone https://github.com/wtf-fivem-mods/wtf_characters [wtf]/wtf_characters/
git clone https://github.com/wtf-fivem-mods/wtf_redis [wtf]/wtf_redis/
```

[wtf_redis]: https://github.com/wtf-fivem-mods/wtf_redis
