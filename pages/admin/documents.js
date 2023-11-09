import React from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, DocumentForm, WrongPermission} from "@/components";

const DocumentsAdminPage = ({isAdmin}) => {
    return (
        isAdmin ? (
                <div className="h-full flex bg-blue-600">
                    <AdminLayout>
                        <div>Documents</div>
                        <DocumentForm></DocumentForm>
                    </AdminLayout>
                </div>
            ):
            (
                <WrongPermission/>
            ));
};

export default DocumentsAdminPage;
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}
