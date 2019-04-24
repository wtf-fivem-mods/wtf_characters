local function OnPlayerConnecting(name, setKickReason, deferrals)
    local source = source
    local identifiers, steamIdentifier = GetPlayerIdentifiers(source)
    deferrals.defer()

    deferrals.update(string.format("Hello %s. Your steam id is being checked.", name))

    for _, v in pairs(identifiers) do
        if string.find(v, "steam") then
            steamIdentifier = v
            break
        end
    end

    if not steamIdentifier then
        deferrals.done("You are not connected to steam.")
    else
        deferrals.done()
    end

    Citizen.SetTimeout(500, function()
        TriggerClientEvent("wtf_characters:steamid", source, steamIdentifier)
    end)
end

AddEventHandler("playerConnecting", OnPlayerConnecting)