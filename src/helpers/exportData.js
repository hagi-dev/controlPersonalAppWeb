import XLSX from 'xlsx';
const exportData =(tabla,data)=> {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${tabla}`);
        XLSX.writeFile(wb,`${tabla}.xlsx`);
}

export default exportData;