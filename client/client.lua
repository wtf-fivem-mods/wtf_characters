RegisterNUICallback('selectCharacter', function()
    SetNuiFocus(false, false)
    ResetCamera()
end)

local function onReceivedSteamID(steamid)
    SendNUIMessage({type = "steamid", steamid = steamid})

    local hasUsers = HasUsers(steamid)
    if not hasUsers then
        SendNUIMessage({type = "nousers"})
    end

    SetNuiFocus(false, false) -- debug reset on load

    DoSelectionCamera()

    SetNuiFocus(true, true)
    SendNUIMessage({type = "open"})
end

RegisterNetEvent("wtf_characters:steamid")
AddEventHandler("wtf_characters:steamid", function(steamid)
    onReceivedSteamID(steamid)
end)