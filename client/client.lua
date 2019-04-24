RegisterNUICallback('selectCharacter', function(data, cb)
    cb("ok")

    local character = GetCharacter(data)
    print('Character ID: '..tostring(character.id))
    print('Character firstName: '..tostring(character.firstName))
    print('Character lastName: '..tostring(character.lastName))

    SetNuiFocus(false, false)
    ResetCamera()
end)

RegisterNUICallback('saveCharacter', function(data, cb)
    cb("ok")
    SetNuiFocus(false, false)
    ResetCamera()

    local character = SaveCharacter(data)
    print('Character ID: '..tostring(character.id))
    print('Character firstName: '..tostring(character.firstName))
    print('Character lastName: '..tostring(character.lastName))
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