export function addUpdater<T>(newData: T, oldData: T[] | undefined) {
   if (!oldData) return [newData]
   return [...oldData, newData]
}

export function patchUpdater<T>(patchedData: T, oldData: T[] | undefined, mapIdTo: keyof T) {
   if (!oldData) return [patchedData]
   const filteredOldData = oldData.filter(data => data[mapIdTo] !== patchedData[mapIdTo])
   return [...filteredOldData, patchedData]
}

export function deleteUpdater<T>(id: T[keyof T], oldData: T[] | undefined, mapIdTo: keyof T) {
   if (!oldData) return undefined
   return oldData.filter(data => data[mapIdTo] !== id)
}
