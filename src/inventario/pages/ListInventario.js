import React, { useEffect, useState } from "react";
import DashboardInventario from "./components/DashboardInventario";
import { useGetInventarioTodoQuery } from "../services/inventarioApi";
import MUIDataTable from "mui-datatables";
import ModalInventario from "./components/ModalInventario";
import reporte_inventario_banner from "../../assets/reporte_inventario_banner.png";
import EditModal from './components/EditModal'

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ListInventario() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userDatos = JSON.parse(localStorage.getItem("userDatos") || "{}");

  const [openModal, setOpenModal] = useState({ abrirModal: false, invenID: null })



  // const handleInventaroIDClick = ({abrir,id}) => {
  //   setInventarioID(id);
  //   setOpenModal(abrir)
  // };

  const handleButtonClick = (cerrarModal) => {
    setOpenModal({ abrirModal: false, invenID: null });
  };


  const { data, isSuccess, isLoading, isError, error } = useGetInventarioTodoQuery(user.access);
  console.log('data', data)

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setFilteredData(data);
    }
  }, [isSuccess, data]);

  const columns = [
    {
      name: "cod_unico",
      label: "Código Único",
    },
    {
      name: "cod_senescyt",
      label: "Código Senescyt",
    },
    {
      name: "cod_instituto",
      label: "Código Instituto",
    },
    {
      name: "descripcion",
      label: "Descripción",
    },
    {
      name: "modelo",
      label: "Modelo",
    },
    {
      name: "serie",
      label: "Serie",
    },
    {
      name: "color",
      label: "Color",
    },
    {
      name: "marca",
      label: "Marca",
    },
    {
      name: "asignado_name",
      label: "Asignado",
    },
    {
      name: "ubicacion_name",
      label: "Ubicación",
    },
    {
      name: "digitador_name",
      label: "Digitador",
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            //onClick={ handleInventaroIDClick({abrir:true, id:5}) 
            //onClick={(e)=>setOpenModal(true)}
            <>
              {userDatos.is_adminInventario && userDatos.is_docente ? (
                <>
                  <ModalInventario id={parseInt(tableMeta.rowData[12])} />
                  <button onClick={(e) => setOpenModal({ abrirModal: true, invenID: parseInt(tableMeta.rowData[12]) })}  >
                    Edit</button>
                </>

              ) : (
                <> </>
              )}
            </>
          );
        },
      },
    },
    {
      name: "id",
      label: "",
      options: {
        display: false,
      },
    },
    {
      name:'materiales',
      label:'materiales'
    },
    {
      name:'estado_name',
      label:'estado'
    },
    {
      name:'tipo_name',
      label:'tipo'
    }
  ];

  const options = {
    selectableRows: "none",
    onTableChange: (action, tableState) => {
      if (action === "filterChange") {
        const filteredData = tableState.displayData.map((item) => item.data);
        setFilteredData(filteredData);
      }
    },
    responsive: "horizontal",
  };

  const exportPDF = () => {
    let dataToExport = filteredData;

    if (!filteredData || filteredData.length === 0) {
      dataToExport = data;
    }

    if (!dataToExport || dataToExport.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const headers = [
      [
        "Código Único",
        "Código Senescyt",
        "Código Instituto",
        "Descripción",
        "Modelo",
        "Serie",
        "Color",
        "Marca",
        "Asignado",
        "Ubicación",
        "Digitador",
      ],
    ];

    const content = {
      startY: 150,
      head: headers,
      body: dataToExport.map((elt) => [
        elt.cod_unico,
        elt.cod_senescyt,
        elt.cod_instituto,
        elt.descripcion,
        elt.modelo,
        elt.serie,
        elt.color,
        elt.marca,
        elt.asignado_name,
        elt.ubicacion_name,
        elt.digitador_name,
      ]),
      styles: { fontSize: 6 },
    };

    const img = new Image();
    img.src = reporte_inventario_banner;
    img.onload = function () {
      doc.addImage(this, "PNG", 10, 10, 578, 90);
      doc.autoTable(content);

      const pageCount = doc.internal.getNumberOfPages();
      const footerText = `Generado por: ${userDatos.first_name} ${userDatos.last_name}`;
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.text(
          footerText,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 30,
          { align: "center" }
        );
      }

      doc.save("Inventario.pdf");
    };
  };

  return (
    <DashboardInventario>
      <button
        onClick={exportPDF}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Generar PDF
      </button>
      <div>
        {userDatos.is_adminInventario ? (
          <button className="bg-blue-900 rounded text-white mb-2">
            <a href="/inventario/register"> Nuevo registro</a>{" "}
          </button>
        ) : (
          <> </>
        )}

      </div>


      <div className="py-8">
        <MUIDataTable
          title={"all"}
          data={filteredData}
          columns={columns}
          options={options}
        />
      </div>

      <div>
        {openModal && (
          <EditModal
            isOpen1={openModal.abrirModal}
            onClick1={handleButtonClick}
            inventarioID={openModal.invenID}
          />
        )}
      </div>


    </DashboardInventario>
  );
}
