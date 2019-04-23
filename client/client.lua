RegisterNUICallback('selectCharacter', function()
    SetNuiFocus(false, false)
    ResetCamera()
end)

Citizen.CreateThread(function()
    SetNuiFocus(false, false) -- debug reset on load

    DoSelectionCamera()

    SetNuiFocus(true, true)
    SendNUIMessage({type = "open"})
end)