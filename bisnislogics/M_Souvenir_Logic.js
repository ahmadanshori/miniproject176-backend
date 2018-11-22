const responseHelper = require("../helpers/Response_Helper");
const souvenirData = require("../datalayers/M_Souvenir_Data");

const M_Souvenir_Logic = {
  readAllHandler: (req, res, next) => {
    souvenirData.readAllData(souvenir => {
      responseHelper.sendResponse(res, 200, souvenir);
    });
  },
  readByIdHandler: (req, res, next) => {
    const souvenirId = req.params.souvenirId;

    souvenirData.readByIdData(souvenir => {
      if (souvenir) {
        responseHelper.sendResponse(res, 200, souvenir);
      } else {
        responseHelper.sendResponse(res, 404, "404. Souvenir Data Not Found");
      }
    }, souvenirId);
  },
  createHandler: (req, res, next) => {
    // Generate Souvenir Code
    souvenirData.lastCodeData(souvenir => {
      if (souvenir.length > 0) {
        let pattern = souvenir[0].code.substr(-4);
        let latestCode = parseInt(pattern) + 1;
        let generatedPattern = pattern.substr(
          0,
          pattern.length - latestCode.toString().length
        );

        // Return New Souvenir Code
        var newCode = "SV" + generatedPattern + latestCode;
      } else {
        var newCode = "SV0001";
      }

      // Containing Souvenir Data
      const newSouvenir = {
        code: newCode,
        name: req.body.name,
        description: req.body.description,
        m_unit_id: req.body.mUnitId,
        is_delete: false,
        created_by: req.body.created_by,
        created_date: new Date().toDateString()
      };

      souvenirData.createData(souvenir => {
        responseHelper.sendResponse(res, 200, souvenir);
      }, newSouvenir);
    });
  },
  updateHandler: (req, res, next) => {
    const souvenirId = req.params.souvenirId;

    souvenirData.readByIdData(souvenir => {
      if (souvenir) {
        const name = req.body.name === "" ? souvenir.name : req.body.name;
        const description =
          req.body.description === ""
            ? souvenir.description
            : req.body.description;
        const mUnitId =
          req.body.mUnitId === "" ? souvenir.m_unit_id : req.body.mUnitId;

        const updateSouvenir = {
          name: name,
          description: description,
          m_unit_id: mUnitId,
          updated_by: req.body.updated_by,
          updated_date: new Date().toDateString()
        };

        souvenirData.updateData(
          souvenir => {
            responseHelper.sendResponse(res, 200, souvenir);
          },
          souvenirId,
          updateSouvenir
        );
      } else {
        responseHelper.sendResponse(res, 404, "Souvenir Not Found!");
      }
    }, souvenirId);
  },
  deleteHandler: (req, res, next) => {
    const souvenirId = req.params.souvenirId;
    const deleteSouvenir = { is_delete: true };

    souvenirData.readByIdData(souvenir => {
      if (souvenir) {
        souvenirData.deleteData(
          souvenir => {
            responseHelper.sendResponse(res, 200, souvenir);
          },
          souvenirId,
          deleteSouvenir
        );
      } else {
        responseHelper.sendResponse(res, 404, "404. Souvenir Data Not Found!");
      }
    }, souvenirId);
  }
};

module.exports = M_Souvenir_Logic;
