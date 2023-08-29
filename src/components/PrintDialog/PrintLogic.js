import Printer from '@digasystems/ipp-browser';


const SetupPrinter = async () => {
    let printerIP = "localhost";
    let url ="http://" + printerIP + ":631/printers/intermec_lcd/print"
    let printer = new Printer(url);
    let msg = {
        "operation-attributes-tag": {
            "document-format": "application/pdf",
        },
        data:  "test"//Buffer.from(docBuf) , 
      };
    await fetch(url, {
        method: "POST",
        body: printer.encodeMsg("Print-Job",msg),
        headers: printer.getHeaders()
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}


export default SetupPrinter;

