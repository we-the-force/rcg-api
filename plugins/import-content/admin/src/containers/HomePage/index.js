import React, { memo, Component } from "react";
import { request } from "strapi-helper-plugin";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import UploadFileForm from "../../components/UploadFileForm";
import MappingTable from "../../components/MappingTable";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
import Row from "../../components/Row";
import Block from "../../components/Block";
import { Select, Label } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { get, has, isEmpty, pickBy, set } from "lodash";
import ExternalUrlForm from "../../components/ExternalUrlForm";
import RawInputForm from "../../components/RawInputForm";

const getUrl = to => to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class HomePage extends Component {
  importSources = [
    { label: "External URL ", value: "url" },
    { label: "Upload file", value: "upload" },
    { label: "Raw text", value: "raw" }
  ];
  state = {
    loading: true, // <---
    modelOptions: [], // <---
    models: [], // <---
    importSource: "upload",
    analyzing: false,
    analysis: null,
    selectedContentType: "",
    fieldMapping: {} // <---
  };
  getTargetModel = () => { // <---
    const { models } = this.state;
    if (!models) return null;
    return models.find(model => model.uid === this.state.selectedContentType);
  };

  setFieldMapping = fieldMapping => { // <---
    this.setState({ fieldMapping });
  };
  componentDidMount() {
    this.getModels().then(res => {
      const { models, modelOptions } = res;
      this.setState({
        models,
        modelOptions,
        selectedContentType: modelOptions ? modelOptions[0].value : ""
      });
    });
  }
  onRequestAnalysis = async analysisConfig => {
    this.analysisConfig = analysisConfig;
    this.setState({ analyzing: true }, async () => {
      try {
        const response = await request("/import-content/preAnalyzeImportFile", {
          method: "POST",
          body: analysisConfig
        });
        console.log(response);

        this.setState({ analysis: response, analyzing: false }, () => {
          strapi.notification.success(`Analyzed Successfully`);
        });
      } catch (e) {
        this.setState({ analyzing: false }, () => {
          strapi.notification.error(`Analyze Failed, try again`);
          strapi.notification.error(`${e}`);
        });
      }
    });
  };
  getModels = async () => {
    this.setState({ loading: true });
    try {
      const response = await request("/content-type-builder/content-types", {
        method: "GET"
      });

      // Remove non-user content types from models
      const models = get(response, ["data"], []).filter(
        obj => !has(obj, "plugin")
      );
      const modelOptions = models.map(model => {
        return {
          label: get(model, ["schema", "name"], ""), // (name is used for display_name)
          value: model.uid // (uid is used for table creations)
        };
      });

      this.setState({ loading: false });

      return { models, modelOptions };
    } catch (e) {
      this.setState({ loading: false }, () => {
        strapi.notification.error(`${e}`);
      });
    }
    return [];
  };
  selectImportSource = importSource => {
    this.setState({ importSource });
  };
  selectImportDest = selectedContentType => {
    this.setState({ selectedContentType });
  };
  onSaveImport = async () => {
    console.log('ahoy');
    /* const { selectedContentType, fieldMapping } = this.state;
    const { analysisConfig } = this;
    const importConfig = {
      ...analysisConfig,
      contentType: selectedContentType,
      fieldMapping
    };
    try {
      await request("/import-content", { method: "POST", body: importConfig });
      this.setState({ saving: false }, () => {
        strapi.notification.info("Import started");
      });
    } catch (e) {
      strapi.notification.error(`${e}`);
    } */
  };
  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>

        {/* <PluginHeader
          title={"Import Content"}
          description={"Import CSV and RSS-Feed into your Content Types"}
        >Alo</PluginHeader> */}
        <Header
          actions={[
            /* {
              label: 'Cancel',
              disabled: !this.state.analysis,
              onClick: () => alert('Cancel button clicked'),
              color: 'cancel',
              type: 'button',
            }, */
            {
              label: "Run the Import",
              disabled: !this.state.analysis,
              onClick: this.onSaveImport,
              color: 'success',
              type: 'submit',
            },
          ]}
          title={{
            label: 'Import Content',
          }}
          content="Import CSV and RSS-Feed into your Content Types"
        />
        <HeaderNav
          links={[
            {
              name: "Import Data",
              to: getUrl("")
            },
            {
              name: "Import History",
              to: getUrl("history")
            }
          ]}
          style={{ marginTop: "4.4rem" }}
        />
        <div className="row">
          <Block
            title="General"
            description="Configure the Import Source & Destination"
            style={{ marginBottom: 12 }}
          >
            <Row className={"row"}>
              <div className={"col-4"}>
                <Label htmlFor="importSource">Import Source</Label>
                <Select
                  name="importSource"
                  options={this.importSources}
                  value={this.state.importSource}
                  onChange={({ target: { value } }) =>
                    this.selectImportSource(value)
                  }
                />
              </div>
              <div className={"col-4"}>
                <Label htmlFor="importDest">Import Destination</Label>
                <Select
                  value={this.state.selectedContentType}
                  name="importDest"
                  options={this.state.modelOptions}
                  onChange={({ target: { value } }) =>
                    this.selectImportDest(value)
                  }
                />
              </div>
            </Row>
            <Row>
              {this.state.importSource === "upload" && (
                <UploadFileForm
                  onRequestAnalysis={this.onRequestAnalysis}
                  loadingAnalysis={this.state.analyzing}
                />
              )}
              {this.state.importSource === "url" && (
                <ExternalUrlForm
                  onRequestAnalysis={this.onRequestAnalysis}
                  loadingAnalysis={this.state.analyzing}
                />
              )}
              {this.state.importSource === "raw" && (
                <RawInputForm
                  onRequestAnalysis={this.onRequestAnalysis}
                  loadingAnalysis={this.state.analyzing}
                />
              )}
            </Row>
          </Block>
        </div>
        {this.state.analysis && (
          <Row className="row">
            <MappingTable
              analysis={this.state.analysis}
              targetModel={this.getTargetModel()}
              onChange={this.setFieldMapping}
            />
          </Row>
        )}
      </div>
    );
  };
}
export default memo(HomePage);
