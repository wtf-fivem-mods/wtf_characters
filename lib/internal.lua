function ResetCamera()
    local pos = GetEntityCoords(GetPlayerPed(-1))

    SetTimecycleModifier("default")
    SetEntityCoords(GetPlayerPed(-1), pos.x, pos.y, pos.z)
    DoScreenFadeIn(500)
    Citizen.Wait(500)

    local cam =
        CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -1355.93, -1487.78, 520.75, 300.00, 0.00, 0.00, 100.00, false, 0)
    PointCamAtCoord(cam2, pos.x, pos.y, pos.z + 200)
    SetCamActiveWithInterp(cam2, cam, 900, true, true)
    Citizen.Wait(900)

    cam =
        CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", pos.x, pos.y, pos.z + 200, 300.00, 0.00, 0.00, 100.00, false, 0)
    PointCamAtCoord(cam, pos.x, pos.y, pos.z + 2)
    SetCamActiveWithInterp(cam, cam2, 3700, true, true)
    Citizen.Wait(3700)
    PlaySoundFrontend(-1, "Zoom_Out", "DLC_HEIST_PLANNING_BOARD_SOUNDS", 1)
    RenderScriptCams(false, true, 500, true, true)
    PlaySoundFrontend(-1, "CAR_BIKE_WHOOSH", "MP_LOBBY_SOUNDS", 1)
    FreezeEntityPosition(GetPlayerPed(-1), false)
    Citizen.Wait(500)
    SetCamActive(cam, false)
    DestroyCam(cam, true)

    DisplayHud(true)
    DisplayRadar(true)
end

function DoSelectionCamera()
    DoScreenFadeOut(10)
    DisplayHud(false)
    DisplayRadar(false)
    while not IsScreenFadedOut() do
        Citizen.Wait(10)
    end
    SetTimecycleModifier("hud_def_blur")
    FreezeEntityPosition(GetPlayerPed(-1), true)
    local cam =
        CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -1355.93, -1487.78, 520.75, 300.00, 0.00, 0.00, 100.00, false, 0)
    SetCamActive(cam, true)
    RenderScriptCams(true, false, 1, true, true)

    Citizen.Wait(5000)

    DoScreenFadeIn(500)
    Citizen.Wait(500)
end
