<script>
import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  data:()=>({
      gradient:"",
      gradient2:""
  }),
  mounted () {
    this.gradient = this.$refs.canvas
    .getContext('2d')
    .createLinearGradient(0, 0, 0, 450)

    this.gradient2 = this.$refs.canvas
    .getContext('2d')
    .createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(119,44,232, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(119,44,232, 0.1)');
    this.gradient.addColorStop(1, 'rgba(119,44,232, 0)');
    
    this.gradient2.addColorStop(0, 'rgba(0, 0, 0, 0.2)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
    this.gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.renderChart({
        datasets: [{
            data: [10, 5, 35],
                backgroundColor:this.gradient2,
                label:['title'],
                borderColor: '#000',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#000',
        },{
            data: [5, 35, 15],
                backgroundColor:this.gradient,
                label:['title'],
                 borderColor: '#772CE8',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#772CE8',
        }],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    }, this.options)
  }
}
</script>