surface
thirds(
	float	Width  = 0.10,				// square width
		Height = 0.10,				// displacement height
		Ramp   = 0.50,				// fraction of square used for the ramp
		Ks = 0.4,				// specular coefficient
		Kd = 0.5, 				// diffuse  coefficient
		Ka = 0.1, 				// ambient  coefficient
		NoiseAmp  = 0.00,			// noise amplitude
		NoiseFreq = 1.00,			// noise frequency
		Roughness = 0.1;			// specular roughness
	color	SpecularColor = color( 1, 1, 1 )	// specular color
)
{
	color DIRT = color( 1., .5, 0. );

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );

	// determine a 4-octave noise value based on our current xyz position:

	point PP = point "shader" P;
	float magnitudeU = 0.;
	float magnitudeV = 0.;
	point PP2 = PP + vector(10.,10.,10.);
	float size = 1.;
	float i;
	for( i = 0.; i < 4.0; i += 1.0 )
	{
		magnitudeU += ( noise( NoiseFreq * size * PP  ) - 0.50 ) / size;
		magnitudeV += ( noise( NoiseFreq * size * PP2 ) - 0.50 ) / size;
		size *= 2.0;
	}

	float up = 2. * u;
	float vp = v;

	up += NoiseAmp*magnitudeU;
	vp += NoiseAmp*magnitudeV;

	float numinu = floor( up / Width );
	float numinv = floor( vp / Width );
	
	float TheHeight = 0.;			// how much displacement to apply
	if( mod( numinu+numinv, 2. ) == 0. )
	{
		float umin = numinu*Width;
		float umax = umin+Width;
		float vmin = numinv*Width;
		float vmax = vmin+Width;
		float distu = min( up-umin, umax-up );
		float distv = min( vp-vmin, vmax-vp );
		float dist = min( distu, distv )/Width;
		float t = smoothstep( 0., Ramp, dist );	   // 0. if dist <= 0., 1. if dist >= Ramp
		TheHeight = t*Height;			// apply the blending
	}

	Oi = Os;	// use whatever opacity the rib file gave us
	
        color TheColor = Cs;
	if( TheHeight > 0. )
		TheColor = DIRT;

	Ci =        TheColor * Ka * ambient();
	Ci = Ci  +  TheColor * Kd * diffuse(Nf);
	Ci = Ci  +  SpecularColor * Ks * specular( Nf, V, Roughness );
}
