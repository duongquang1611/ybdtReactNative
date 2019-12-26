
const loadDataAppointment = async (id) => {
    
    let allAppointment = await appointmentApi.getListAppointmentById(id);
    let oldAppointment = allAppointment.filter(item => {
        return Date.parse(moment(item.start).format("YYYY/MM/DD")) < new Date().getTime()
    });
    let newAppointment = allAppointment.filter(item => {
        return Date.parse(moment(item.start).format("YYYY/MM/DD")) > new Date().getTime()
    });

    return dataAppointment = {
        allAppointment,
        oldAppointment,
        newAppointment
    }
}
export default loadDataAppointment;