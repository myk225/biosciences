
import './index.css'
const Contact = () => {
    return(
        <div className="Home-main-container">
            {/* <Navbar /> */}
            <div className="permisions-card-main">
                <div className="permissions-card-header">
                    <h3 className="heder-name-title">Role Name</h3>
                    <input className="headr-input-card" type="text" />
                </div>
                <div className="permission-card-content">
                    <div className="permissions-content-crd">
                        <div className="permission-content-header">
                            <div className="permission-content-heder-frst">
                                <h3 className="permission-content-header-name">Administrator</h3>
                                <p className="permission-content-header-des">Permission</p>
                            </div>
                            <div className="select-all-cccard">
                                <input type="checkbox" id="select-all" />
                                <label className="selectall-card-name" htmlFor="select-all">Select All</label>
                            </div>
                        </div>
                        <div className="content-details">
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Full Access Blood Collecton</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Full Access Centrifuge</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Create Study</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Delete(Disable) Study</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Create Users(Active/Inactive)</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Edit Study No, Title(Edit Study Wizard)</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Print The Study report(Pdf, samples will be provided with softcopy)</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Edit Study No, Title(Edit Study Wizard)</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Edit Study Data with comments(all activities and Wizard)</p>
                            </div> 
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Lock / Unlock Study(hide study from other expect administrator)</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Browse Audit logs</p>
                            </div>
                        </div>
                    </div>
                    <div className="permissions-content-crd">
                        <div className="permission-content-header">
                            <div className="permission-content-heder-frst">
                                <h3 className="permission-content-header-name">Study Director</h3>
                                <p className="permission-content-header-des">Only to studies allocated by administrator</p>
                            </div>
                            <div className="select-all-cccard">
                                <input type="checkbox" id="select-all-two" />
                                <label className="selectall-card-name" htmlFor='select-all-two'>Select All</label>
                            </div>
                        </div>
                        <div className="content-details">
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Full Access Blood Collecton</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Full Access Centrifuge</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Edit Study Data with comments(all activities and Wizard)</p>
                            </div> 
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Browse Audit logs</p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Print the study report</p>
                            </div>
                        </div>
                    </div>
                    <div className="permissions-content-crd">
                        <div className="permission-content-header">
                            <div className="permission-content-heder-frst">
                                <h3 className="permission-content-header-name">Study Personnel</h3>
                                <p className="permission-content-header-des">Only to studies allocated by administrator</p>
                            </div>
                            <div className="select-all-cccard">
                                <input type="checkbox" id="select-all-three" />
                                <label className="selectall-card-name" htmlFor='select-all-three'>Select All</label>
                            </div>
                        </div>
                        <div className="content-details">
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Data Entry Blood Collection </p>
                            </div>
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Data Entry Centrifuge</p>
                            </div>
                            <div className="content-checkbox-card" style={{width: '100%'}}>
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Data Entry Storage(Comment Entry on all above activities)</p>
                            </div>
                        </div>
                    </div>
                    <div className="permissions-content-crd">
                        <div className="permission-content-header">
                            <div className="permission-content-heder-frst">
                                <h3 className="permission-content-header-name">QA Reviewer</h3>
                                <p className="permission-content-header-des">Permission</p>
                            </div>
                            <div className="select-all-cccard">
                                <input type="checkbox" id="select-all-four" />
                                <label className="selectall-card-name" htmlFor='select-all-four'>Select All</label>
                            </div>
                        </div>
                        <div className="content-details">
                            <div className="content-checkbox-card" style={{width: '100%'}}>
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Access all read-only(Comment Entry) </p>
                            </div>
                        </div>
                    </div>
                    <div className="permissions-content-crd">
                        <div className="permission-content-header">
                            <div className="permission-content-heder-frst">
                                <h3 className="permission-content-header-name">Disabled</h3>
                                <p className="permission-content-header-des">Permission</p>
                            </div>
                            <div className="select-all-cccard">
                                <input type="checkbox" id="select-all-five" />
                                <label className="selectall-card-name" htmlFor='select-all-five'>Select All</label>
                            </div>
                        </div>
                        <div className="content-details">
                            <div className="content-checkbox-card">
                                <input type="checkbox" />
                                <p className="content-checkbox-label">Login Disabled </p>
                            </div>
                        </div>
                    </div>
                    <button className="update-roll-button">Update Role</button>
                </div>
            </div>
        </div>
    )
}
export default Contact