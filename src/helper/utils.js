export default function checkFieldsValue(data, field_value) {
    return data.name.toLowerCase().startsWith(field_value.toLowerCase())
        || data.icao.toLowerCase().startsWith(field_value.toLowerCase())
        || data.iata.toLowerCase().startsWith(field_value.toLowerCase())
        || data.country.toLowerCase().startsWith(field_value.toLowerCase())
        || data.city.toLowerCase().startsWith(field_value.toLowerCase())
}