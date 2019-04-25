local steamID = null

local function OnPlayerConnecting() --name, setKickReason, deferrals
    local source = source
    local identifiers = GetPlayerIdentifiers(source)

    for _, v in pairs(identifiers) do
        if string.find(v, "steam") then
            steamID = v
            break
        end
    end
end

AddEventHandler("playerConnecting", OnPlayerConnecting)

RegisterNetEvent("wtf_characters:getSteamID")
AddEventHandler("wtf_characters:getSteamID", function()
    local source = source
    Citizen.CreateThread(function()
        while steamID == nil do
            Citizen.Wait(100)
        end
        TriggerClientEvent("wtf_characters:receiveSteamID", source, steamID)
    end)
end)