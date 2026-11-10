const initialData = {
    bookings : []
};

export const bookingReducer = (state=initialData, action) => {
    switch(action.type)
    {
        case 'GET_ALL_BOOKING' : {
            return{
                ...state,
                bookings : action.payload
            }
        }
        default:return state
    }
}