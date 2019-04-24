local function OnPlayerConnecting() --name, setKickReason, deferrals
    local source = source
    local identifiers, steamID = GetPlayerIdentifiers(source)

    for _, v in pairs(identifiers) do
        if string.find(v, "steam") then
            steamID = v
            break
        end
    end

    Citizen.SetTimeout(1000, function()
        TriggerClientEvent("wtf_characters:steamID", source, steamID)
    end)
end

AddEventHandler("playerConnecting", OnPlayerConnecting)