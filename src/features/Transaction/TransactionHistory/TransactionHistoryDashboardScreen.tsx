import styled from "@emotion/styled";
import MainMenu from "../../../components/MainMenu/MainMenu";
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
// @ts-ignore
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Plus, ThreeDotsVertical } from "react-bootstrap-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTransaction, selectMenuOption } from "../../Demo/demoSlice";
import COLORS from "../../../utils/colors";
import { css } from "@emotion/css";

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const MainContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: start;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 9vh;
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const TextTile = styled.p`
font-size: 23px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 123%;
  color: rgba(60, 46, 60, 1);
  width: 400px;
  word-wrap: break-word;
  margin-bottom: 4px;
`;

const LeftPaneHeader = styled.div`
  flex: 2;
  height: 10%;
  width: 100%;
  maxWidth: 100%;
  padding: 3.35vh 11.15vh 3.35vh 3.35vh;
`;

const TableScreen = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`;

const TableOptions = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;

const SearchBarContainer = styled.div`
margin-left: 0vh;
`;

const ExportContainer = styled.div`
margin-left: 35%;
`;

export default function TransactionHistoryDashboardScreen() {
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const transactions = useAppSelector((state) => state.demo.transactions);
    const [transactionList, setTransactionList] = useState([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
      console.log("dispatch fetch all transaction.");
      dispatch(selectMenuOption(8));
      dispatch(fetchTransaction());
    }, [dispatch]);

    useEffect(() => {

      setTransactionList(transactions.map((transaction) => {
        let status = "Completed";
        if (transaction?.status === "500") {
          status = "Failed";
        }
        if (transaction?.status === "400") {
          status = "Pending";
        }
        return {
          ...transaction,
          status: status,
        };
      }));
    }, [transactions]);
    
    
    const columns = [{
      dataField: 'id',
      text: 'Transaction Id.',
      headerAlign: 'center',
      sort: true,
    }, {
      dataField: 'student_name.emergecy_contact_name',
      headerAlign: 'center',
      text: 'Student',
      sort: true
    }, {
      dataField: 'total_amount',
      text: 'Total Amount',
      headerAlign: 'center',
      sort: true
    }, {
      dataField: 'date',
      text: 'Date',
      headerAlign: 'center',
      sort: true
    }, {
      dataField: 'status',
      text: 'Status',
      headerAlign: 'center',
      // style: { backgroundColor: getStatusColor() },
      style: (cell, row, rowIndex, colIndex) => {
        if (cell === "Completed") {
          return { backgroundColor: COLORS.GREEN_LIGHT, color: "white", fontWeight: "bold", textAlign: "center" };
        }
        if (cell === "Failed") {
          return { backgroundColor: COLORS.RED_LIGHT, color: "white", fontWeight: "bold", textAlign: "center" };
        }
        return{  backgroundColor: COLORS.ORANGE_LIGHT, color: "white", fontWeight: "bold", textAlign: "center" };
      },
      sort: true,
      csvExport: false
    },
    {
      dataField: null,
      text: 'Action',
      formatter: (cellContent, row) => (
        <span><ThreeDotsVertical size={22} /></span>
      ),
      style: (cell, row, rowIndex, colIndex) => {
        return{ width: "10px", textAlign: "right" };
      },
      headerStyle: (colum, colIndex) => {
        return { width: '13vh', textAlign: 'right' };
      }
    }];
    
    const defaultSorted: [{ dataField: any; order: 'asc' | 'desc' }] = [{
      dataField: 'name',
      order: 'desc'
    }];

    const selectRow: SelectRowProps<any> = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: []
    };

    const handleAddTransaction = () => {
      setDisplayModal(true);
    };

    const handleClose = () => {
      console.log("handle close gets called.");
      setDisplayModal(false);
    };

    console.log("transactions before error", transactionList);

    const renderNoTransactions = () => (
      <>
        <InputButton2
            name="add_transaction_button"
            preIcon={<Plus size={23} />}
            title="Add Transaction"
            color="red"
            onClick={handleAddTransaction}
            class={css`background-color:${COLORS.MORE_RED_BUTTON} !important;line-height: 0.15vh;border-radius:7px; position: absolute; right: 3vh; top: 1.55vh;`}
          />
          <p className={css`text-align: center; font-size: 1.85rem; margin-top: 5.45vh;`}>
            No more transactions to show.
          </p>
      </>
    );

  return (
    <MainContainer>
      <MainMenu />
      <LeftPaneHeader>
        <TextTile>Transactions History</TextTile>
        <br/>
        {(!transactionList || transactionList.length === 0) && renderNoTransactions()}
        {(!!transactionList && transactionList.length > 0) && (<ToolkitProvider
          bootstrap4
          keyField="id"
          data={ transactionList }
          columns={ columns }
          exportCSV
          search
        >
          {
            (props: any) => (
              <>
                <TableScreen>
                  <TableOptions>
                    <SearchBarContainer>
                      <SearchBar { ...props.searchProps } style={{ width: "300px", marginTop: "14px" }} />
                    </SearchBarContainer>
                    <ExportContainer>
                      <InputButton2
                        name="add_transaction_button"
                        preIcon={<Plus size={23} />}
                        title="Add Transaction"
                        color="red"
                        onClick={handleAddTransaction}
                        class={css`background-color:${COLORS.MORE_RED_BUTTON} !important;line-height: 0.15vh;border-radius:7px;`}
                      />
                      <ExportCSVButton { ...props.csvProps }>Export as XLS</ExportCSVButton>
                    </ExportContainer>
                  </TableOptions>
                  <br/>
                  <br/>
                  <BootstrapTable
                    { ...props.baseProps }
                    selectRow={selectRow}
                    defaultSorted={defaultSorted}
                  />
                </TableScreen>
              </>
            )
          }  
        </ToolkitProvider>)}
      </LeftPaneHeader>
      <AddTransactionModal show={displayModal} onClose={handleClose} />
    </MainContainer>
  )
}
