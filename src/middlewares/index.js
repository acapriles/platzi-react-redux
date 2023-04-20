export const customLogger = (store) => (next) => (action) => {
    //console.log(action);
    next(action);
};
  
export const featuring = (store) => (next) => (actionInfo) => {
    
    const featured = [{ name: 'eddie' }, ...actionInfo.payload];
    const updatedActionInfo = {
        ...actionInfo,
        action: { ...actionInfo, payload: featured },
    };
    next(updatedActionInfo);
};