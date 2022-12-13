
import { packSiblings } from 'd3';
import { points } from './diagram';
const calcLayout = ({ cards, topics, width, height, NODERAD = 12 }) => {
    if (cards.length == 0) return;

    const sort = (ar, acc = (a) => a.title) => {
        ar = ar.slice().sort((a, b) => acc(b).localeCompare(a.title));
        return ar;
    };

    const findAllSubsets = (arr = []) => {
        arr.sort();
        const res = [[]];
        let count, subRes, preLength;
        for (let i = 0; i < arr.length; i++) {
            count = 1;
            while (arr[i + 1] && arr[i + 1] == arr[i]) {
                count += 1;
                i++;
            }
            preLength = res.length;
            for (let j = 0; j < preLength; j++) {
                subRes = res[j].slice();
                for (let x = 1; x <= count; x++) {
                    if (x > 0) subRes.push(arr[i]);
                    res.push(subRes.slice());
                }
            }
        }
        return res;
    };

    const isSubset = (a, b) => {
        const len = a.filter((d) => b.includes(d)).length;
        // console.log(a, b);
        return a.length === len;
    };

    const getSetsStr = (d, accessor = (e) => e.title) => {
        const ret = sort(d, accessor).reduce(
            (acc, cur) => (acc.length > 0 ? `${acc},${accessor(cur)}` : accessor(cur)),
            ''
        );
        return ret;
    };

    const nodeData = cards.map((d) => {
        let cardTopics = [];
        topics.forEach((topic) => {
            if (d.topics.includes(topic.id)) cardTopics.push(topic);
        });
        const sets = sort(cardTopics).map((d) => d.title);
        const setsStr = getSetsStr(cardTopics);
        return { ...d, sets, setsStr };
    });

    const unique = (a) => [...new Set(a)];

    const setKeys = unique(nodeData.flatMap((d) => d.sets));

    const allSetKeys = findAllSubsets(setKeys).map((d) => sort(d, (d) => d));

    const allSets = allSetKeys
        .filter((d) => d.length > 0)
        .map((a) => ({
            key: getSetsStr(a, (d) => d),
            sets: a,
            values: nodeData.filter((d) => isSubset(a, d.sets))
        }))
        .filter((d) => d.values.length > 0);

    allSets.forEach((d) => {
        d.size = d.values.length / d.sets.length;
    });

    const { textCentres, circles: circleDict, rs } = points({ data: allSets, width, height });

    let circleVals = [];
    Object.keys(circleDict).forEach((key) => {
        circleVals = [...circleVals, { value: circleDict[key], title: key }];
    });

    const nodes = nodeData.map((d) => {
        return {
            ...d,
            ...circleDict[d.setsStr],
            x: textCentres[d.setsStr]?.x,
            y: textCentres[d.setsStr]?.y,
            sx: textCentres[d.setsStr]?.x,
            sy: textCentres[d.setsStr]?.y
        };
    });

    const labelPoints = Object.entries(textCentres).map(([l, pos]) => ({ text: l, ...pos }));

    const labels = labelPoints.filter((d, i) => allSets[i].sets.length === 1);

    const rsNodes = rs.map((d) => {
        return { ...d, nodes: nodes.filter((n) => n.setsStr === d.setsStr) };
    });

    const setNodes = rsNodes.map((set) => {
        var innerRadius = set.r,
            center = set.center,
            nodes = set.nodes,
            x = center.x,
            y = center.y;

        const p = packSiblings(nodes.map((d) => ({ ...d, r: NODERAD + 2 })));
        p.forEach((n) => {
            n.x += x;
            n.y += y;
        });
        return { ...set, nodes: p };
    });

    return { nodes: setNodes.flatMap((d) => d.nodes), circleVals, labels };
    // console.log(newNodes);
};


const getRadius = (title, circleVals) => {
    let circleVal = circleVals.find((cirV) => cirV.title == title);
    return circleVal.value.radius;
};
export { calcLayout, getRadius }