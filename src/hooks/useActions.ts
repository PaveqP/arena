import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { actions as filterActions } from "../store/filters/filters.slice"
import { actions as dataActions } from "../store/data/data.slice"

const rootActions = {
    ...filterActions,
    ...dataActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}