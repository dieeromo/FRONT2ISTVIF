import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch} from './store'
import {store} from './store'

export const useAppDispatch = () => useDispatch();
export const useAppSelector = () => useSelector(store.getState);


// export const useAppDispatch = () => useAppDispatch<AppDispatch>()
// export const useAppSelector = () => TypedUseSelectorHook<RootState> = useSelector