const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql2/promise");


/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})
con.end();
console.log("Disconnected until next query is run")
*/



async function query(sql) {
  const con = await mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: "openmrs"
    
});
  const [results, ] = await con.execute(sql);
  con.end();
  return results;
}


const app = express();

app.use(cors());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

router.get('/labOrderPatients', async function (req, res, next) {
  console.log("Fetching SQL stuffs");
  try {
    res.json(await query(`SELECT DISTINCT
          CONCAT(COALESCE(pn.given_name,' '),' ',COALESCE(pn.middle_name,' '),' ',COALESCE(pn.family_name,' ')) AS name,
          pa.value AS localName,
          pi.identifier as identifier,
          concat("",p.uuid) as uuid,
          p.gender,
          concat("",v.uuid) as activeVisitUuid,
          IF(va.value_reference = "Admitted", "true", "false") as hasBeenAdmitted,
          TIMESTAMPDIFF(YEAR, p.birthdate, CURDATE()) AS age
        from visit v
        join person_name pn on v.patient_id = pn.person_id and pn.voided = 0
        join person_attribute pa on pn.person_id = pa.person_id AND pa.person_attribute_type_id = 8
        join patient_identifier pi on v.patient_id = pi.patient_id
        join patient_identifier_type pit on pi.identifier_type = pit.patient_identifier_type_id
        join global_property gp on gp.property="bahmni.primaryIdentifierType" and gp.property_value=pit.uuid
        join person p on p.person_id = v.patient_id
        join orders on orders.patient_id = v.patient_id
        join order_type on orders.order_type_id = order_type.order_type_id and order_type.name != "Order" and order_type.name != "Drug Order"
        left outer join visit_attribute va on va.visit_id = v.visit_id and va.voided = 0 and va.attribute_type_id =
          (select visit_attribute_type_id from visit_attribute_type where name="Admission Status")
        where v.date_stopped is null AND v.voided = 0 and order_id not in
          (select obs.order_id
            from obs
          where person_id = pn.person_id and order_id = orders.order_id);`
        ));
  } catch (err) {
    console.error(`Error while fetching Lab Order Patients `, err.message);
    next(err);
  }
  
});

app.use("/api/", router);


/*
}
app.get("/api/food", (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }
*/
 

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})
