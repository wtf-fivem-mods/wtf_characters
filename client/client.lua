local character = nil

AddEventHandler("wtf_characters:getCharacter", function(cb)
    while character == nil do
        Citizen.Wait(500)
    end
    cb(character)
end)

function onCharacterSelected(c)
    character = c
    TriggerEvent("wtf_characters:receiveCharacter", c)
end

RegisterNUICallback('selectCharacter', function(data, cb)
    cb("ok")
    SetNuiFocus(false, false)
    ResetCamera()

    local c = GetCharacter(data)
    onCharacterSelected(c)
end)

RegisterNUICallback('saveCharacter', function(data, cb)
    cb("ok")
    SetNuiFocus(false, false)
    ResetCamera()

    local c = SaveCharacter(data)
    onCharacterSelected(c)
end)

local function onReceivedSteamID(steamID)
    SendNUIMessage({type = "steamID", steamID = steamID})

    local characters = GetCharacters(steamID)
    if characters ~= nil then
        SendNUIMessage({type = "characters", characters = characters})
    end

    SetNuiFocus(false, false) -- debug reset on load

    Citizen.CreateThread(function()
        DoSelectionCamera()
    end)

    Citizen.Wait(500)
    SetNuiFocus(true, true)
    SendNUIMessage({type = "open"})
end

RegisterNetEvent("wtf_characters:steamID")
AddEventHandler("wtf_characters:steamID", function(steamID)
    onReceivedSteamID(steamID)
end)
