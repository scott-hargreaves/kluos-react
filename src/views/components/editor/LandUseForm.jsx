import React from "react";

import HistoryOfUseEditor from "./HistoryOfUseEditor";
import RecordInformationEditor from "./RecordInformationEditor";
import SiteActivityEditor from "./SiteActivityEditor";
import SiteInformationEditor from "./SiteInformationEditor";
import SourceInformationEditor from "./SourceInformationEditor";
import TextEditor from './TextEditor';

import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles }   from '@material-ui/core';


const styles = theme => ({
    root: {
        height: '100%'
    },
    box: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    expanded: {

    },
    rowHeader: {
        flex: '0 1 auto'
    },
    rowContent: {
        borderColor: theme.palette.grey["300"],
        borderStyle: 'solid',
        borderWidth: 1,
        flex: '1 1 200px',
        overflowY: 'auto',
        padding: 8,
    },
    panel: {
        borderColor: theme.palette.grey["300"],
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: 'none',
        '&.Mui-disabled': {
            backgroundColor: theme.palette.background.paper,
        }
    },
    panelSummaryRoot: {
        backgroundColor: theme.palette.grey['300'],
        '&$expanded': {
            minHeight: 32,
        },
        '&.Mui-disabled': {
            opacity: 1,
        }
    },
    panelSummaryContent: {
        margin: 0,
        '&$expanded': {
            margin: 0,
        }
    },
    panelTitle: {
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
    },
    panelDetailsRoot: {
        padding: 8,
    },
    modifiedBy: {
        fontSize: '0.8em',
        color: theme.palette.grey.A200,
        position: 'absolute',
        top: 4,
        right:0,
    },
    modifiedOn: {
        fontSize: '0.8em',
        color: theme.palette.grey.A200,
        position: 'absolute',
        bottom: 4,
        right:0,
    },
    footer: {
        color: theme.palette.text.disabled,
        fontSize: '0.66rem',
    }
});


class LandUseForm extends React.Component {

    handleOnChange = ( evt ) => {
        if(this.props.onPropertyChange)
            this.props.onPropertyChange({ name: evt.target.name, value: evt.target.value });
    };

    render() {
        const { classes, landUse, editable } = this.props;

        const createdOn = Date.parse(landUse.createdOn);
        const modifiedOn = Date.parse(landUse.modifiedOn);

        return (
            <div className={ classes.root }>
                <CssBaseline/>

                <Box className={ classes.box }>
                    <Box className={ classes.rowHeader }>
                        <Grid
                            container
                            spacing={0}
                            style={{ paddingTop: 2, width: '100%'}}
                        >

                            <Grid
                                xs={3}
                                item
                                style={{paddingRight: 8}}
                            >
                                <TextEditor
                                    inputProps={{
                                        style: { padding: 8 },
                                        readOnly: true
                                    }}
                                    name="kluosId"
                                    label="KLUOS ID"
                                    placeholder="<No KLUOS ID>"
                                    style={{marginRight: 8 }}
                                    defaultValue={ landUse.kluosId }
                                    variant="outlined"
                                />

                            </Grid>

                            <Grid
                                xs={3}
                                item
                            >
                                <TextEditor
                                    inputProps={{
                                        style: { padding: 8 },
                                        readOnly: !editable
                                    }}
                                    name="mapNumber"
                                    label="Map Number"
                                    placeholder="<No Map Number>"
                                    defaultValue={ landUse.mapNumber }
                                    variant="outlined"
                                    onChange={ this.handleOnChange }
                                />

                            </Grid>

                        </Grid>
                    </Box>

                    <ExpansionPanel
                        elevation={ 0 }
                        expanded={true}
                        className={ classes.rowContent }
                        style={{marginTop: 4}}
                    >
                        <Grid
                            container
                            spacing={0}
                            style={{width: '100%'}}
                        >
                            <Grid
                                xs={12}
                                item
                            >
                                <ExpansionPanel
                                    disabled
                                    expanded={true}
                                    className={ classes.panel }
                                    style={{marginBottom: 8 }}
                                >
                                    <ExpansionPanelSummary
                                        classes={{root: classes.panelSummaryRoot,  content: classes.panelSummaryContent, expanded: classes.expanded }}
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        <Typography
                                            variant="overline"
                                            className={ classes.panelTitle }
                                        >
                                            Record Information
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className={ classes.panelDetailsRoot }
                                    >

                                        <RecordInformationEditor
                                            name="recordInformation"
                                            recordInformation={ landUse.recordInformation }
                                            readOnly={ !editable }
                                            style={{ width: '100%' }}
                                            onPropertyChange={ this.handleOnChange }
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid
                                xs={12}
                                item
                            >
                                <ExpansionPanel
                                    disabled
                                    expanded={true}
                                    className={ classes.panel }
                                    style={{marginBottom: 8 }}
                                >
                                    <ExpansionPanelSummary
                                        classes={{root: classes.panelSummaryRoot,  content: classes.panelSummaryContent, expanded: classes.expanded}}
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        <Typography
                                            variant="overline"
                                            className={ classes.panelTitle }
                                        >
                                            Source Information
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className={ classes.panelDetailsRoot }
                                    >

                                        <SourceInformationEditor
                                            name="sourceInformation"
                                            sourceInformation={ landUse.sourceInformation }
                                            readOnly={ !editable }
                                            style={{ width: '100%' }}
                                            onPropertyChange={ this.handleOnChange }
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                            <Grid
                                xs={12}
                                item
                            >

                                <ExpansionPanel
                                    disabled
                                    expanded={true}
                                    className={ classes.panel }
                                    style={{marginBottom: 8 }}
                                >
                                    <ExpansionPanelSummary
                                        disabled
                                        classes={{root: classes.panelSummaryRoot,  content: classes.panelSummaryContent, expanded: classes.expanded}}
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        <Typography
                                            variant="overline"
                                            className={ classes.panelTitle }
                                        >
                                            Site Information
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className={ classes.panelDetailsRoot }
                                    >

                                        <SiteInformationEditor
                                            name="siteInformation"
                                            siteInformation={ landUse.siteInformation }
                                            readOnly={ !editable }
                                            style={{ width: '100%' }}
                                            onPropertyChange={ this.handleOnChange }
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid
                                xs={12}
                                item
                            >

                                <ExpansionPanel
                                    disabled
                                    expanded={true}
                                    className={ classes.panel }
                                    style={{marginBottom: 8 }}
                                >
                                    <ExpansionPanelSummary
                                        classes={{root: classes.panelSummaryRoot,  content: classes.panelSummaryContent, expanded: classes.expanded}}
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        <Typography
                                            variant="overline"
                                            className={ classes.panelTitle }
                                        >
                                            Site Activities
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className={ classes.panelDetailsRoot }
                                    >

                                        <SiteActivityEditor
                                            defaultValue={ landUse.siteActivity }
                                            name="siteInformation"
                                            readOnly={ !editable }
                                            style={{ width: '100%' }}
                                            onPropertyChange={ this.handleOnChange }
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid
                                xs={12}
                                item
                            >

                                <ExpansionPanel
                                    disabled
                                    expanded
                                    className={ classes.panel }
                                    style={{marginBottom: 8 }}
                                >
                                    <ExpansionPanelSummary
                                        classes={{root: classes.panelSummaryRoot,  content: classes.panelSummaryContent, expanded: classes.expanded}}
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        <Typography
                                            variant="overline"
                                            className={ classes.panelTitle }
                                        >
                                            History Of Use
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className={ classes.panelDetailsRoot }
                                    >


                                        <HistoryOfUseEditor
                                            defaultValue={ landUse.historyOfUse }
                                            readOnly={ !editable }
                                            style={{ width: '100%' }}
                                        />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid
                                xs={12}
                                item
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    style={{ width: '100%'}}
                                >
                                    <Grid
                                        xs={6}
                                        item
                                    >
                                        <Typography className={ classes.footer }>Created By: { landUse.createdBy }</Typography>
                                        <Typography className={ classes.footer }>Created On: { new DateFnsUtils().format( createdOn, 'MMM d, yyyy' ) }</Typography>
                                    </Grid>
                                    <Grid
                                        xs={6}
                                        item
                                        style={{ position: 'relative' }}
                                    >
                                        <div style={{ display: 'inline-block', position: 'absolute', right: 0, top: 0 }}>
                                          <Typography className={ classes.footer }>Modified By: { landUse.modifiedBy }</Typography>
                                          <Typography className={ classes.footer }>Modified On: { new DateFnsUtils().format( modifiedOn, 'MMM d, yyyy' ) }</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </ExpansionPanel>

                </Box>

            </div>
        )
    }
}

export default withStyles(styles)(LandUseForm);
