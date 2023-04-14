
import { packSiblings, text } from 'd3';
import { points } from './diagram';

const calcLayout = ({ cards: tmpCards, topics, width, height, NODERAD = 12 }) => {
    if (tmpCards.length == 0) return;

    const topix = [...new Set(tmpCards.flatMap((d) => d.topicIds))]

    console.log('topci', topix)

    const cards = tmpCards.map(d => ({ ...d, topics: d.topics.map(d => d.id) }))

    // const topics = tmpTopix.map(d => d.id)

    const sort = (ar, acc = (a) => a.title) => {
        ar = ar.slice().sort((a, b) => !acc(b).localeCompare(a.title));
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
    const getSetsStrRev = (d, accessor = (e) => e.title) => {
        const ret = sort(d, accessor).reduce(
            (acc, cur) => (acc.length > 0 ? `${accessor(cur)},${acc}` : accessor(cur)),
            ''
        );
        return ret;
    };

    const nodeData = cards.map((d) => {
        let cardTopics = [];
        topix.forEach((id) => {
            if (d.topics.includes(id)) cardTopics.push(topics.find(d => d.id == id));
        });
        const sets = sort(cardTopics).map((d) => d.title);
        const setsStr = getSetsStr(cardTopics);
        const setsStrRev = getSetsStrRev(cardTopics);
        return { ...d, sets, setsStr, setsStrRev };
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

    // console.log('allSets', allSets)
    const { textCentres, circles: circleDict, rs } = points({ data: allSets, width, height });

    // console.log('circleDict', circleDict, 'textCentres', textCentres, 'rs', rs)

    let circleVals = [];
    Object.keys(circleDict).forEach((key) => {
        circleVals = [...circleVals, { value: circleDict[key], title: key }];
    });

    console.log('nodeData', nodeData)
    console.log('textCentres', textCentres)

    const textCentresArr = Object.entries(textCentres).map(([l, pos]) => ({ setsStr: l, ...pos }));
    const nodes = nodeData.map((d) => {
        return {
            ...d,
            ...circleDict[d.setsStr],
            x: textCentresArr.find(e => e.setsStr.split(',').every(f => d.sets.includes(f)))?.x,
            y: textCentresArr.find(e => e.setsStr.split(',').every(f => d.sets.includes(f)))?.y,
            sx: textCentresArr.find(e => e.setsStr.split(',').every(f => d.sets.includes(f)))?.x,
            sy: textCentresArr.find(e => e.setsStr.split(',').every(f => d.sets.includes(f)))?.y,
            // sx: textCentresArr.find(e => e.sets.every(f => d.setsStr.includes(f)))?.x,
            // sy: textCentresArr.find(e => e.sets.every(f => d.setsStr.includes(f))).y,
        };
    });

    console.log('nodes', nodes);

    const labelPoints = Object.entries(textCentres).map(([l, pos]) => ({ text: l, ...pos }));

    const labels = labelPoints.filter((d, i) => allSets[i].sets.length === 1);

    console.log('rs', rs)
    const rsNodes = rs.map((d) => {
        return { ...d, nodes: nodes.filter((n) => n.setsStr === d.setsStr || n.setsStrRev === d.setsStr.split(',').reverse().join(',')) };
    });


    const uniqBy = (arr, predicate) => {
        const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

        return [...arr.reduce((map, item) => {
            const key = (item === null || item === undefined) ?
                item : cb(item);

            map.has(key) || map.set(key, item);

            return map;
        }, new Map()).values()];
    };

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