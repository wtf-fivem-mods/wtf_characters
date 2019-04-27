local character = nil

local function onReceivedSteamID(steamID)
    SendNUIMessage({type = "steamID", steamID = steamID})

    local characters = GetCharacters(steamID)
    if characters ~= nil then
        SendNUIMessage({type = "characters", characters = characters})
    end

    SetNuiFocus(false, false) -- debug reset on load

    Citizen.CreateThread(
        function()
            DoSelectionCamera()
        end
    )

    Citizen.Wait(500)
    SetNuiFocus(true, true)
    SendNUIMessage({type = "open"})
end

TriggerServerEvent("wtf_characters:getSteamID")
RegisterNetEvent("wtf_characters:receiveSteamID")
AddEventHandler(
    "wtf_characters:receiveSteamID",
    function(steamID)
        if steamID == nil then
            print("wtf_characters:receiveSteamID: steamID was nil")
            return
        end
        onReceivedSteamID(steamID)
    end
)

AddEventHandler(
    "wtf_characters:getCharacter",
    function(cb)
        while character == nil do
            Citizen.Wait(500)
        end
        cb(character)
    end
)

function onCharacterSelected(c)
    character = c
    TriggerEvent("wtf_characters:receiveCharacter", c)
end

RegisterNUICallback(
    "selectCharacter",
    function(data, cb)
        cb("ok")
        local c = GetCharacter(data)
        onCharacterSelected(c)

        SetNuiFocus(false, false)
        ResetCamera()
    end
)

RegisterNUICallback(
    "saveCharacter",
    function(data, cb)
        cb("ok")
        SetNuiFocus(false, false)
        ResetCamera()

        local c = SaveCharacter(data)
        onCharacterSelected(c)
    end
)
