
import { ScreenView } from "./screen"
import { ROUTER, SCREEN } from "./app"
import { Weya as $, WeyaElement } from "./weya"
import { Experiments, Experiment } from "./experiments"
import { getExperiments } from "./cache"

class ExperimentView {
    experiment: Experiment
    elem: WeyaElement

    constructor(e: Experiment) {
        this.experiment = e
    }

    render() {
        this.elem = $('div.experiment.up', {
            on: {click: this.onClick}
        }, $ => {
            $('h3', this.experiment.name)
            $('span', this.experiment.lastRunDateTime[0])
            // $('span', this.experiment.lastRunDateTime[1])
        })

        return this.elem
    }

    onClick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()

        ROUTER.navigate(`/experiment/${this.experiment.name}`)
    }
}

class ExperimentsView implements ScreenView {
    elem: HTMLElement
    experimentsList: HTMLDivElement
    experiments: Experiments

    render(): WeyaElement {
        getExperiments().then((experiments) => {
            this.experiments = experiments
            this.renderExperiments()
        })
        
        this.elem = <HTMLElement>$('div.container', $ => {
            $('h1', 'Experiments')
            this.experimentsList = <HTMLDivElement>$('div.experiments_list', '')
        })
        return this.elem
    }

    private renderExperiments() {
        let views: ExperimentView[] = []
        for(let e of this.experiments.sorted()) {
            views.push(new ExperimentView(e))
        }

        for(let v of views) {
            this.experimentsList.append(v.render())
        }
    }
}

export class ExperimentsHandler {
    constructor() {

    ROUTER.route('', [this.handleExperiments])
}

    handleExperiments = () => {
        SCREEN.setView(new ExperimentsView())
        console.log("test")
    }
}