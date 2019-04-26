RegisterNetEvent("wtf_characters:getSteamID")
AddEventHandler(
    "wtf_characters:getSteamID",
    function()
        local steamID = nil
        local source = source
        local identifiers = GetPlayerIdentifiers(source)

        for _, v in pairs(identifiers) do
            if string.find(v, "steam") then
                steamID = v
                break
            end
        end

        TriggerClientEvent("wtf_characters:receiveSteamID", source, steamID)
    end
)
