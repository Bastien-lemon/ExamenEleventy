const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
  const getDeps = `${"https://collectionapi.metmuseum.org/public/collection/v1/departments"}`;
  const depsResp = await EleventyFetch(getDeps, {
    duration: "1d",
    type: "json",
  });

  let out = {
    size: depsResp.departments.length,
    objectsSize: 0,
    elements: [],
  };

  for (const dep of depsResp.departments) {
    const depObjects = `${
      "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=" +
      dep.departmentId
    }`;
    const objectResp = await EleventyFetch(depObjects, {
      duration: "1d",
      type: "json",
    });
    dep.total = objectResp.total;
    dep.objects = [];
    out.objectsSize += dep.total;

    for (const objectId of objectResp.objectIDs.slice(0, 20)) {
      const oneObjectUrl = `${
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
        objectId
      }`;
      const oneObject = await EleventyFetch(oneObjectUrl, {
        duration: "1d",
        type: "json",
      });
      dep.objects.push(oneObject);
    }
    out.elements.push(dep);
  }

  return out;
};
